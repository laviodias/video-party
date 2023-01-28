import { table, minifyItems } from "../../utils/Airtable";

export default async (_req, res) => {
  if (_req.method == "GET") {
    try {
      const { id } = _req.query;
      if (id) {
        const record = await table.find(id);
        if (!record.fields.deleted) {
          res.status(200).json(record);
        } else {
          res.status(404).json({ msg: "Record not found!" });
        }
      } else {
        const records = await table
          .select({
            view: "Grid view",
            filterByFormula: `NOT({deleted})`,
            maxRecords: 10,
          })
          .firstPage();
        const minfiedItems = minifyItems(records);
        res.status(200).json(minfiedItems);
      }
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong! 😕" });
    }
  } else if (_req.method == "POST") {
    try {
      const { author, url, title } = JSON.parse(_req.body);
      const createdRecords = await table.create([
        {
          fields: {
            author,
            url,
            title,
          },
        },
      ]);

      const createdRecord = {
        id: createdRecords[0].id,
        author: createdRecords[0].fields.author,
        url: createdRecords[0].fields.url,
        title: createdRecords[0].fields.title,
      };
      res.status(200).json(createdRecord);
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong! 😕" });
    }
  } else if (_req.method == "PATCH") {
    try {
      const { id, deleted } = JSON.parse(_req.body);
      const deletedRecords = await table.update([
        {
          id,
          fields: {
            deleted: deleted,
          },
        },
      ]);

      res.status(200).json(deletedRecords);
    } catch (error) {
      res.status(500).json({ msg: "Something went wrong! 😕" });
    }
  }
};
