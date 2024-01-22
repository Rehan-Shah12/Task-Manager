import fs from "fs";

const filePath = "sampleFile.txt";
const outputFilePath = "output.txt";
const wordToFind = "Galaxy";
const replacementWord = "Samsung";

// fs.readFile(filePath, "utf8", (error, data) => {
//   if (error) {
//     throw new Error("Could not read file", error);
//   }

//   const updatedFile = data.replace(wordToFind, replacementWord);

//   fs.writeFile(filePath, updatedFile, "utf8", () => {
//     try {
//       console.log("File Updated");
//     } catch (error) {
//       console.log("Error:", error);
//     }
//   });
// });

////////////////////////////////////////////////////////////////////////////////////
//   const words = data.split(/\s+/);

//   const updatedWords = words.map((word) => {
//     return word === wordToFind ? replacementWord : word;
//   });

//   const joinedWords = updatedWords.join("\n");

//   console.log(" Joined Words", joinedWords);

//   if (words.includes(wordToFind)) {
//     console.log("Word Included");
//   } else {
//     console.log("Word Not Included");
//   }
//   fs.writeFile(filePath, joinedWords, "utf8", (err) => {
//     try {
//       console.log(
//         `The target Word ${wordToFind} was replaced by Replacement Word ${replacementWord}`
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   });
// });
///////////////////////////////////////////////////////////////////////////////

const readStream = fs.createReadStream(filePath, "utf8");
const writeStream = fs.createWriteStream(outputFilePath);

readStream.on("data", (chunk) => {
  const updatedChunk = chunk.replace(wordToFind, replacementWord);
  writeStream.write(updatedChunk);
});

readStream.on("end", () => {
  writeStream.end();
  console.log(
    `The target Word ${wordToFind} was replaced by Replacement Word ${replacementWord}`
  );
});

writeStream.on("error", (err) => {
  console.log("Error Reading File", err);
});

writeStream.on("finish", () => {
  console.log("File write complete.");
});

writeStream.on("error", (err) => {
  console.error("Error writing to file:", err);
});
