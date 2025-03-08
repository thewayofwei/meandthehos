import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const SHEET_ID = "1AQxwLImSca802511jVIpAYH2CX79sOI5a-KcTe4Dfy8";
const API_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

export default function Dictionary() {
  const [search, setSearch] = useState("");
  const [dictionary, setDictionary] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.text())
      .then((csvText) => {
        const rows = csvText.split("\n").slice(1);
        const words = rows.map((row) => {
          const [word, meaning] = row.split(",");
          return { word: word.trim(), meaning: meaning.trim() };
        });
        setDictionary(words);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredWords = dictionary.filter(({ word }) =>
    word.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-lg mx-auto">
      <Input
        placeholder="Search for a word..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />
      <div className="space-y-2">
        {filteredWords.map(({ word, meaning }) => (
          <Card key={word}>
            <CardContent className="p-4">
              <p className="text-lg font-semibold">{word}</p>
              <p className="text-gray-600">{meaning}</p>
            </CardContent>
          </Card>
        ))}
        {filteredWords.length === 0 && (
          <p className="text-gray-500">No words found.</p>
        )}
      </div>
    </div>
  );
}
