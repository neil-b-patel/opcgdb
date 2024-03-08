// ==UserScript==
// @name OPTCG Crawler
// @description Get card information from the OPTCG website
// @version 1.0.0
// @match https://en.onepiece-cardgame.com/cardlist/*
// @match https://asia-en.onepiece-cardgame.com/cardlist/*
// @run-at document-idle
// @grant none
// ==/UserScript==

/* ***************************************************************
 * ***************************************************************
 * **************** IMPORTANT NOTE BEFORE USE ********************
 * ***************************************************************
 * ***************************************************************
 *
 * This user script is out of date. This means the scraper has been
 * updated to include additional tweaks to the data before saving it
 * including but not limitted to updated data format for types,
 * typo corrections, set information, etc. Before use, please make
 * sure to update it. Otherwise, the information outputted by this
 * user script will be incompatible with the DB's expected format
 */

function getSetNameAndID(input) {
  const parts = input.split("[");
  const id = parts[1]
    ? parts[1].replace(/-/g, "").replace(/]/g, "").trim()
    : "PROMO";
  return id;
}

function crawlPage() {
  const cardNodes = document.querySelectorAll(".resultCol > a");
  const cardData = [...cardNodes].map((card) => {
    // Card ID & Data target
    const id = card.getAttribute("data-src");
    const cardDetails = document.querySelector(id);
    const cardHead = cardDetails
      .querySelector(".infoCol")
      .innerText.trim()
      .split("|");

    // Required Values
    const number = cardHead[0].trim();

    const _set = cardDetails
      .querySelector(".getInfo")
      .innerText.replace("Card Set(s)", "")
      .trim();
    const set = getSetNameAndID(_set);

    const rarity = cardHead[1].replace("CARD", "").trim();

    const color = cardDetails
      .querySelector(".color")
      .innerText.replace("Color", "");

    const type = cardDetails
      .querySelector(".feature")
      .innerText.replace("Type", "");

    const category = cardHead[2].trim();

    const cost = cardDetails
      .querySelector(".cost")
      .innerText.replace("Cost", "");

    const cardName = cardDetails.querySelector(".cardName").innerText;

    // Optional Values
    const _attribute = cardDetails
      .querySelector(".attribute")
      .innerText.replace("Attribute", "")
      .trim();
    const attribute = _attribute === "-" ? undefined : _attribute;

    const _effect = cardDetails
      .querySelector(".text")
      .innerText.replace("Effect", "");
    const effect = _effect === "-" ? undefined : _effect;

    const _power = cardDetails
      .querySelector(".power")
      .innerText.replace("Power", "");
    const power = _power === "-" ? undefined : _power;

    const _counter = cardDetails
      .querySelector(".counter")
      .innerText.replace("Counter", "");
    const counter = _counter === "-" ? undefined : _counter;

    const _trigger = cardDetails.querySelector(".trigger");
    const trigger = _trigger
      ? _trigger.innerText.replace("Trigger", "").trim()
      : undefined;

    return {
      id: id.replace("#", ""),
      number,
      rarity,
      category,
      name: cardName,
      cost,
      attribute,
      power,
      counter,
      color,
      type,
      effect,
      trigger,
      set,
    };
  });

  const formattedData = JSON.stringify(cardData, null, 2);
  navigator.clipboard
    .writeText(formattedData)
    .then(() => {
      alert(`${cardData.length} card(s) data was copied to clipboard!`);
    })
    .catch((error) => {
      console.error("Failed to copy card data to clipboard:", error);
    });
}

const body = document.querySelector("body");
const crawlButton = document.createElement("button");
crawlButton.addEventListener("click", crawlPage);
crawlButton.style.backgroundColor = "#928157";
crawlButton.style.color = "white";
crawlButton.style.position = "fixed";
crawlButton.style.bottom = "20px";
crawlButton.style.right = "20px";
crawlButton.innerText = "Copy Card Data to clipboard";
body.appendChild(crawlButton);
