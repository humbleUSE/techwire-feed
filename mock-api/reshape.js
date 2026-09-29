import fs from "node:fs";

// convert the response json file to javascript object
const raw = JSON.parse(fs.readFileSync("mock-api/hacker-news-data.json"));

// map the each: story.objectID => story.id
const db = {
    ...raw,
    hits: raw.hits.map((story) => ({ id: story.objectID, ...story })),
};

// converts the mapped object back to json format
fs.writeFileSync("mock-api/db.json", JSON.stringify(db, null, 4));
console.log("Done!", db.hits.length, "stories saved");
