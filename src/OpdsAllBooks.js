import React, { useEffect, useState } from "react";
import { XMLParser } from "fast-xml-parser";
const MAIN_OPDS_URL = "https://storage.googleapis.com/story-weaver-e2e-production/catalog/catalog.xml";

export default function OpdsAllBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAllBooks() {
      try {
        // Fetch main feed
        const mainRes = await fetch(MAIN_OPDS_URL);
        const mainXml = await mainRes.text();
        const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "" });
        const mainObj = parser.parse(mainXml);

        // Debug: Print all links as JSON to console
        let allRawLinks = mainObj.feed && mainObj.feed.link
          ? (Array.isArray(mainObj.feed.link) ? mainObj.feed.link : [mainObj.feed.link])
          : [];
        console.log("All feed links (full):", JSON.stringify(allRawLinks, null, 2));

        // Filtering: update here if needed!
        // Try to filter links with a title (language/category) and type containing "acquisition"
        let links = allRawLinks.filter(link =>
          link.href && link.title && (
            // These may indicate a language/category or book catalog
            link.type?.includes("navigation") ||
            link.type?.includes("acquisition") ||
            link.rel === "subsection" ||
            link.rel === "start" ||
            link.rel === "http://opds-spec.org/navigation"
          )
        );
        console.log("Filtered catalog links:", links);

        if (!links.length) {
          throw new Error("No book/catalog links found. See console logs and update 'links' filter!");
        }

        const allBooks = [];
        for (let langLink of links) {
          try {
            const res = await fetch(langLink.href);
            const xml = await res.text();
            const obj = parser.parse(xml);

            let entries = [];
            if (obj.feed && obj.feed.entry) {
              entries = Array.isArray(obj.feed.entry) ? obj.feed.entry : [obj.feed.entry];
              console.log(`Entries for ${langLink.title}:`, entries);
            }

            for (let entry of entries) {
              let linksArr = Array.isArray(entry.link) ? entry.link : [entry.link].filter(Boolean);
              allBooks.push({
                id: entry.id || Math.random().toString(36),
                title: entry.title || "Untitled",
                author: entry.author?.name || (typeof entry.author === "string" ? entry.author : "Unknown"),
                summary: entry.summary || entry.content || "",
                cover: linksArr.find(l => l.rel === "http://opds-spec.org/image")?.href || "",
                downloadLink: linksArr.find(l => l.rel && l.rel.includes("acquisition"))?.href || "",
                language: langLink.title || "Unknown"
              });
            }
          } catch (bookError) {
            console.warn("Failed to fetch books for:", langLink.title, bookError);
          }
        }

        setBooks(allBooks);
      } catch (e) {
        console.error("Unable to fetch OPDS catalog:", e);
        setError("Failed to aggregate books from all catalogs.");
      } finally {
        setLoading(false);
      }
    }
    fetchAllBooks();
  }, []);

  if (loading) return <div style={{ padding: "1rem" }}>Loading all books...</div>;
  if (error) return <div style={{ color: "red", padding: "1rem" }}>{error}</div>;

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
      gap: "16px",
      padding: "1rem"
    }}>
      {books.length === 0 ? (
        <div>No books found.<br />Check browser console for debugging info and link structure!</div>
      ) : (
        books.map(book => (
          <div key={book.id} style={{
            border: "1px solid #ccc",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px #0002"
          }}>
            {book.cover && <img src={book.cover} alt={book.title} style={{ width: "100%", height: "200px", objectFit: "cover", marginBottom: "1rem" }} />}
            <h3>{book.title}</h3>
            <p><b>Author:</b> {book.author}</p>
            <p><b>Language:</b> {book.language}</p>
            <p style={{ fontSize: "0.95rem", minHeight: "48px" }}>
              {book.summary.slice(0, 100)}{book.summary.length > 100 ? "..." : ""}
            </p>
            {book.downloadLink && (
              <a
                href={book.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  marginTop: "8px",
                  padding: "8px 16px",
                  background: "#1976d2",
                  color: "white",
                  borderRadius: "4px",
                  textDecoration: "none"
                }}
              >
                Download
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
}
