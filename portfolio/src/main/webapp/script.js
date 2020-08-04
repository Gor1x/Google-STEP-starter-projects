// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random fact about me to the page.
 */
function addRandomFactAboutMe() {
  const facts = [
      'Now I am STEP intern in Google', 
      'I live in Chelyabinsk. It is a big city in Russia', 
      'I speak Russian(Да!)', 
      'I study for my bachelor degree in SPbSU',
      'I love programming',
      'Обычная русская фраза?! Это что, шутка какая-то?'
      ];

  // Pick a random fact.
  const fact = facts[Math.floor(Math.random() * facts.length)];

  // Add it to the page.
  const factContainer = document.getElementById('fact-container');
  factContainer.innerText = fact;
}

function getHello() {
  fetch('/data').then(response => response.text()).then((quote) => {
    document.getElementById('hello-container').innerText = quote;
  });
}