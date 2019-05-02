import express from "express";
import splashy from "splashy";
import got from "got";
import colorableDominant from "colorable-dominant";
import Color from "color";

const app = express();

const getColorPalette = async url => {
  const { body } = await got(url, { encoding: null });
  const predominantColors = await splashy(body);
  let palette = colorableDominant(predominantColors);
  const color = Color(palette.backgroundColor);
  palette = {
    ...palette,
    darkBackgroundColor: color.darken(0.5).hex(),
    darkerBackgroundColor: color.darken(0.75).hex()
  };

  return { predominantColors, palette };
};

app.get("/palette/:url", async (req, res) => {
  const data = await getColorPalette(req.params.url);
  res.json(data);
});

app.listen();
