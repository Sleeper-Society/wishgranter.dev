function commentCode0() {
  const code0_file = ((document.getElementById("code0"))
    .files ?? [])[0];
  const data_file = ((document.getElementById("data"))
    .files ?? [])[0];

  if (!code0_file || !data_file) return;
  var gdjs = {};
  const code0_file_reader = new FileReader();
  const data_file_reader = new FileReader();
  code0_file_reader.addEventListener("load", () => {
    if (data_file_reader.readyState == FileReader.DONE) {
      downloadCode0(code0_file_reader.result, gdjs.projectData);
    }
  });
  data_file_reader.addEventListener("load", () => {
    eval(data_file_reader.result);
    if (code0_file_reader.readyState == FileReader.DONE) {
      downloadCode0(code0_file_reader.result, gdjs.projectData);
    }
  });
  code0_file_reader.readAsText(code0_file);
  data_file_reader.readAsText(data_file);
}

function downloadCode0(code0, hyperspace_data) {
  const blob = new Blob([code0Commenter(code0, hyperspace_data)], {
    type: ".js",
  });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = "code0.js";
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}

function code0Commenter(
  code0,
  hyperspace_data,
) {
  const possibly_commented_get_from_index_regex =
    /(?<=\.getVariables\(\)\s*.getFromIndex\()(\d+)(?: \/\* [\w]* \*\/)?\)(\n|(?: \/\/[\w]+\n))?/;
  const scene_variable_regex = /(?<=runtimeScene\s*\.getScene\(\)\s*)/;
  const object_assignment_regex =
    /(?:copyArray\(\s*runtimeScene\.getObjects\(")?([\w.]+)(?:(?:"\),)|:)\s*([\w.]+)(?:(?:,?\s*\))|(?:,|(?:\s*})))/g;
  const object_map = new Map(
    code0
      .matchAll(object_assignment_regex)
      .map((match) => [match[2], match[1]]),
  );
  const object_variable_regex = /(?<=([\w.]+)\[\w+\]\s*)/;
  const replacing_scene_variable_regex = new RegExp(
    scene_variable_regex.source.substring(
      0,
      scene_variable_regex.source.length - ")".length,
    ) + possibly_commented_get_from_index_regex.source.substring("(?<=".length),
    "g",
  );
  const replacing_object_variable_regex = new RegExp(
    object_variable_regex.source.substring(
      0,
      object_variable_regex.source.length - ")".length,
    ) + possibly_commented_get_from_index_regex.source.substring("(?<=".length),
    "g",
  );
  const scene_variable_replacer = (
    _substring,
    ...capture_groups
  ) => {
    const variable_name =
      hyperspace_data.layouts[0].variables[Number.parseInt(capture_groups[0])]
        .name;
    return capture_groups[1] == ""
      ? `${capture_groups[0]} /* ${variable_name} */)`
      : `${capture_groups[0]}) //${variable_name}\n`;
  };
  const object_variable_replacer = (
    _substring,
    ...capture_groups
  ) => {
    const index = Number.parseInt(capture_groups[1]);
    const object =
      hyperspace_data.layouts[0].objects.find(
        (obj) => obj.name == object_map.get(capture_groups[0]),
      ) ??
      hyperspace_data.layouts[0].objects.find(
        (obj) =>
          obj.name ==
          object_map.get(
            object_map
              .keys()
              .find((key) =>
                new RegExp(
                  capture_groups[0].substring(
                    0,
                    capture_groups[0].length -
                      (/\d+$/.exec(capture_groups[0]) ?? [{ length: 0 }])[0]
                        .length,
                  ) + "\\d",
                ).test(key),
              ) ?? "",
          ),
      );
    if (!object) {
      console.error("Cannot find object for", capture_groups[0]);
      return `${capture_groups[1]})`;
    }
    const variable_name = object.variables[index].name;
    return capture_groups[2] == ""
      ? `${capture_groups[1]} /* ${variable_name} */)`
      : `${capture_groups[1]}) //${variable_name}\n`;
  };
  return code0
    .replaceAll(replacing_scene_variable_regex, scene_variable_replacer)
    .replaceAll(replacing_object_variable_regex, object_variable_replacer);
}
