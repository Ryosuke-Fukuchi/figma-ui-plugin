import { showUI, on } from "@create-figma-plugin/utilities";

export default function () {
  showUI({ width: 500, height: 400 });
}

on("GENERATE_UI", async ({ json }: { json: string }) => {
  try {
    const parsed: UIJson = JSON.parse(json);
    await createUIFromJson(parsed);
    figma.closePlugin("生成完了");
  } catch (e) {
    figma.closePlugin("JSONの読み込みに失敗しました");
  }
});

async function createUIFromJson(ui: UIJson) {
  const createdFrames: SceneNode[] = [];

  for (const frameData of ui.frames) {
    const frame = figma.createFrame();
    frame.name = frameData.name ?? "Unnamed Frame";
    frame.resize(frameData.width ?? 400, frameData.height ?? 600);
    frame.x = frameData.x ?? 0;
    frame.y = frameData.y ?? 0;
    frame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];

    for (const node of frameData.nodes) {
      if (node.type === "TEXT") {
        const text = figma.createText();
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });

        text.characters = node.characters ?? "";
        text.fontSize = node.fontSize ?? 14;
        text.x = node.x ?? 0;
        text.y = node.y ?? 0;

        if ("fills" in node && Array.isArray(node.fills)) {
          text.fills = node.fills.map((fill) => ({
            ...fill,
            type: "SOLID",
          })) as Paint[];
        }

        frame.appendChild(text);
      } else if (node.type === "RECTANGLE") {
        const rect = figma.createRectangle();
        rect.resize(node.width ?? 100, node.height ?? 40);
        rect.x = node.x ?? 0;
        rect.y = node.y ?? 0;
        rect.fills = [
          {
            type: "SOLID",
            color: node.color ?? { r: 0.9, g: 0.9, b: 0.9 },
          },
        ];

        if (node.strokes) {
          rect.strokes = node.strokes.map((s) => ({
            ...s,
            type: "SOLID",
          })) as Paint[];
          rect.strokeWeight = node.strokeWeight ?? 1;
          rect.strokeAlign = node.strokeAlign ?? "INSIDE";
        }

        // ✅ 角の丸みを設定（存在する場合）
        if ("cornerRadius" in node && typeof node.cornerRadius === "number") {
          rect.cornerRadius = node.cornerRadius;
        }

        // ✅ ドロップシャドウを設定（存在する場合）
        if ("effects" in node && Array.isArray(node.effects)) {
          rect.effects = node.effects;
        }

        if ("dashPattern" in node && Array.isArray(node.dashPattern)) {
          rect.dashPattern = node.dashPattern;
        }

        frame.appendChild(rect);
      } else if (node.type === "LINE") {
        const line = figma.createLine();

        line.x = node.x ?? 0;
        line.y = node.y ?? 0;
        line.resize(node.width ?? 100, 0);
        line.rotation = node.rotation ?? 0;

        if (node.strokes) {
          line.strokes = node.strokes.map((s) => ({
            ...s,
            type: "SOLID",
          })) as Paint[];
          line.strokeWeight = node.strokeWeight ?? 1;
        }

        if (node.effects) {
          line.effects = node.effects;
        }

        if ("dashPattern" in node && Array.isArray(node.dashPattern)) {
          line.dashPattern = node.dashPattern;
        }

        frame.appendChild(line);
      } else if (node.type === "ELLIPSE") {
        const ellipse = figma.createEllipse();

        ellipse.x = node.x ?? 0;
        ellipse.y = node.y ?? 0;
        ellipse.resize(node.width ?? 100, node.height ?? 100);

        if (node.fills) {
          ellipse.fills = node.fills.map((f) => ({
            ...f,
            type: "SOLID",
          })) as Paint[];
        }

        if (node.strokes) {
          ellipse.strokes = node.strokes.map((s) => ({
            ...s,
            type: "SOLID",
          })) as Paint[];
          ellipse.strokeWeight = node.strokeWeight ?? 1;
          ellipse.strokeAlign = node.strokeAlign ?? "CENTER";
        }

        if ("dashPattern" in node && Array.isArray(node.dashPattern)) {
          ellipse.dashPattern = node.dashPattern;
        }

        frame.appendChild(ellipse);
      }
    }

    figma.currentPage.appendChild(frame);
    createdFrames.push(frame);
  }

  figma.viewport.scrollAndZoomIntoView(createdFrames);
}
