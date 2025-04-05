/** @jsx h */
import { h, render } from "preact";
import { emit } from "@create-figma-plugin/utilities";

function PluginUI() {
  function handleClick() {
    const json = (document.getElementById("jsonInput") as HTMLTextAreaElement)
      .value;
    emit("GENERATE_UI", { json });
  }

  return (
    <div>
      <h2>UIを生成</h2>
      <textarea id="jsonInput" style={{ width: "100%", height: "300px" }} />
      <br />
      <button onClick={handleClick}>生成</button>
    </div>
  );
}

// ✅ ここでマウント！ これが必要！
export default function () {
  render(<PluginUI />, document.body);
}
