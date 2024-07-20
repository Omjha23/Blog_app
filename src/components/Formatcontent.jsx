import ki from "../assets/2min.png";

const formatContent = (content) => {
  const lines = content.split('\n');
  let formattedContent = '';
  let isNumberedList = false;
  let headingNumber = 1; // Counter for heading numbers
  let numberOfHeadings = 0; // Count of headings

  lines.forEach((line, index) => {
    if (/^#/.test(line.trim())) {
      // This is a heading
      if (numberOfHeadings === 3) {
        // Add the image after the third heading
        formattedContent += `<img src="${ki}" alt="Additional" class="my-4" />`;
      }
      formattedContent += `<h2>${headingNumber}. ${line.replace(/^#\s*/, '')}</h2>`;
      headingNumber++;
      numberOfHeadings++;
    } else if (/^\d+\./.test(line.trim())) {
      // This is a numbered list
      if (!isNumberedList) {
        formattedContent += '<ol>';
        isNumberedList = true;
      }
      formattedContent += `<li>${line.replace(/^\d+\.\s*/, '')}</li>`;
    } else {
      if (isNumberedList) {
        formattedContent += '</ol>';
        isNumberedList = false;
      }
      formattedContent += `<p>${line}</p>`;
    }
  });

  if (isNumberedList) {
    formattedContent += '</ol>';
  }

  return formattedContent;
};
