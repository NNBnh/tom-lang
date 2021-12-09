"use strict";

/* --------------------------------- Config --------------------------------- */

let langRight  = "t";
let langLeft   = "o";
let langIncmnt = "m";
let langDecmnt = "-";
let langOutput = "l";
let langInput  = "a";
let langOpen   = "n";
let langClose  = "g";

let langName = "tom-lang";
let langPage = "https://github.com/NNBnh/tom-lang";

let authorName = "NNB";
let authorPage = "https://github.com/NNBnh";

let description = "🎉🎁🎉";

/* -------------------------------------------------------------------------- */

let params = Object.fromEntries(new URLSearchParams(window.location.search).entries());

let custom = false;

if (
  [
    typeof(params.commands   ),
    typeof(params.name       ),
    typeof(params.page       ),
    typeof(params.author     ),
    typeof(params.apage      ),
    typeof(params.description)
  ].includes("string")
) {
  if (params.commands.length === 8) {
    custom = true
  }
}

if (custom === true) {
  if (typeof(params.commands) === "string") {
    langRight  = params.commands[0];
    langLeft   = params.commands[1];
    langIncmnt = params.commands[2];
    langDecmnt = params.commands[3];
    langOutput = params.commands[4];
    langInput  = params.commands[5];
    langOpen   = params.commands[6];
    langClose  = params.commands[7];
  }

  langName    = typeof(params.name       ) === "string" ? params.name        : "Not brainfuck";
  langPage    = typeof(params.page       ) === "string" ? params.page        : "";
  authorName  = typeof(params.author     ) === "string" ? params.author      : "Anonymous";
  authorPage  = typeof(params.apage      ) === "string" ? params.apage       : "";
  description = typeof(params.description) === "string" ? params.description : langName + " is a brainfuck-like esoteric programming language.";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementsByTagName("title")[0].innerText = langName;

  function makeUrl() {
    let code = document.getElementById("code").value || "";
    let input = document.getElementById("input").value || "";

    let url = window.location.href.split("?")[0];

    url += "?code="  + encodeURIComponent(code );
    url += "&input=" + encodeURIComponent(input);

    if (custom === true) {
      url += typeof(params.commands   ) === "string" ? "&commands="    + encodeURIComponent(params.commands   ) : "";
      url += typeof(params.name       ) === "string" ? "&name="        + encodeURIComponent(params.name       ) : "";
      url += typeof(params.page       ) === "string" ? "&page="        + encodeURIComponent(params.page       ) : "";
      url += typeof(params.author     ) === "string" ? "&author="      + encodeURIComponent(params.author     ) : "";
      url += typeof(params.apage      ) === "string" ? "&apage="       + encodeURIComponent(params.apage      ) : "";
      url += typeof(params.description) === "string" ? "&description=" + encodeURIComponent(params.description) : "";
    }

    document.getElementById("url").setAttribute("href", url);
  }

  document.getElementById("code").value = params.code ?? "";
  document.getElementById("input").value = params.input ?? "";
  makeUrl();
  document.getElementById("code").addEventListener("change", makeUrl);
  document.getElementById("input").addEventListener("change", makeUrl);

  document.getElementsByTagName("form")[0].addEventListener("submit", function (e) {
    e.preventDefault();
    let code = document.getElementById("code").value;
    let input = document.getElementById("input").value;
    try {
      document.getElementById("output").innerText = run(code, input);
    } catch (e) {
      document.getElementById("output").innerHTML = "<spam class='error'>" + e + "</spam>";
    }
  });

  document.getElementById("about").addEventListener("click", function () {
    document.getElementById("output").innerHTML = 
      [
        [
          langRight  + " <spam class='grey'>: Move the pointer to the right.</spam>",
          langLeft   + " <spam class='grey'>: Move the pointer to the left.</spam>",
          langIncmnt + " <spam class='grey'>: Increment the memory cell at the pointer.</spam>",
          langDecmnt + " <spam class='grey'>: Decrement the memory cell at the pointer.</spam>",
          langOutput + " <spam class='grey'>: Output the character signified by the cell at the pointer.</spam>",
          langInput  + " <spam class='grey'>: Input a character and store it in the cell at the pointer.</spam>",
          langOpen   + " <spam class='grey'>: Jump past the matching closure if the cell at the pointer is 0.</spam>",
          langClose  + " <spam class='grey'>: Jump back to the matching opener if the cell at the pointer is nonzero.</spam>"
        ].join("<br>"),

        "<a href='" + langPage + "' target='_blank'>" + langName + "</a><br> by <a href='" + authorPage + "' target='_blank'>" + authorName + "</a>",

        description,

        "This interpreter was generated using <a href='https://github.com/NNBnh/brainalias' target='_blank'>BrainAlias</a> by <a href='https://github.com/NNBnh' target='_blank'>NNB</a>.",
        "Which is a fork of <a href='https://github.com/skilldrick/brainfuck-js' target='_blank'>brainfuck-js</a> by <a href='https://github.com/skilldrick' target='_blank'>Nick Morgan</a>."
      ].join("<br><br>")
    ;
  });
});
