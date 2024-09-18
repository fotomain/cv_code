

import jsPDF from 'jspdf'

// npm install jspdf --save
// npm install jspdf-autotable

const pause = () => {
  return new Promise(r => setTimeout(r, 1000))
}
const pdfFileName_demo = `Movies_relating_to_${Date.now()}.pdf`
const pdfTableHeaders_demo = [
  {key: 'row_number', label: 'Title'},
  {key: 'name', label: 'Product Name'},
  {key: 'regular_price', label: 'Regular Price'},
  {key: 'main_image_url', label: 'Main image'},
  {key: 'description', label: 'Description'},
]

const pdfTableData_demo=[
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
  {row_number:'1',name:'name111',regular_price:'regular_price', description:'description, description description, ', main_image_url:'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'},
]


const getDataUri =  (url) =>
{
  return new Promise(resolve => {
    var image = new Image();
    image.setAttribute('crossOrigin', 'anonymous'); //getting images from external domain

    image.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;

      //next three lines for white background in case png has a transparent background
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = '#fff';  /// set white fill style
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      canvas.getContext('2d').drawImage(this, 0, 0);

      resolve(canvas.toDataURL('image/jpeg'));
    };

    image.src = url;
  })
}

const pdfTableOutput = async (p) => {

  // for (let i = 0; i < 100; i++) {
  //   p.refresh_state({pdf_output_finished:i})
  // }
  // return

  const {data, headers, filename} = p
  // let imgUrl = 'https://site555.antinedoebit.com/wp-content/prod_all/images_landscape/prod739__i1__strudel-with-red-fish-and-spinach.webp'
  // let imgUrl = 'https://as2.ftcdn.net/jpg/00/42/98/87/500_F_42988762_JMNpHWOFWnbtCBZeYsRo5PmzD28rIquS.jpg'

  const doc = new jsPDF({
    orientation: 'l',
    unit: 'mm',
    format: 'a4',
  })




  // console.log('=== data, headers, filename',data, headers, filename)

  // Get the page total pt height and pt width based on
  // https://github.com/MrRio/jsPDF/blob/ddbfc0f0250ca908f8061a72fa057116b7613e78/jspdf.js#L59
  // And because we are in landscape mode (see orientation in jsPDF config options above)
  // I flipped the width x height values to reflect this
  const pageDimensions = {
    height: 200,
    width: 300
    // height: 595.28,
    // width: 841.89
  }

  // Set some general padding to the document
  const pageMarginX = 25
  const pageMarginY = 25
  // const pageMargin = 50

  // The live area of a document represents the
  // area of the page that will have content.
  // Here I am saying whatever the dimension parameters,
  // take off the margin on both sides.
  const liveArea = {
    width: pageDimensions.width - pageMarginX ,
    height: pageDimensions.height - pageMarginY
  }

  // Let's set up a standard padding that we can add to known coordinates
  const padding = 5

  doc.setFontSize(16)
  doc.text('Products List',pageMarginX,pageMarginY-10)

  doc.setFontSize(8)

  const xPositions = []

  headers.forEach((heading, index) => {
    // If we choose to, we can add a prop 'xPos' to the headers config in App.js
    // this will set the starting positions of the headers if we need to define column widths
    // I'm choosing to just space all columns evenly :)
    if (heading.hasOwnProperty('xPos')) {
      doc.text(heading.label, heading.xPos, pageMarginX)
      xPositions.push(heading.xPos)
    } else {
      // console.log('=== t1')
      // Here we are starting at pageMargin's xPosition plus whatever index we are on
      // multiplied by the number of columns needed
      // column 1 starts at: pageMargin(50pt) + index(0) * (liveArea(791)/amountOfColumns(4))(791/4 = 197.75pt per column) = 50
      // column 2 starts at: 50 + 1 * 197.75 =  247.75
      // column 3 starts at: 50 + 2 * 197.75 =  445.5
      // column 4 starts at: 50 + 3 * 197.75 =  643.25
      const xPositionForCurrentHeader = pageMarginX + index * (liveArea.width/(headers.length))
      const yPositionForHeaders = pageMarginX
      doc.text(heading.label, index === 0 ? xPositionForCurrentHeader:(xPositionForCurrentHeader + padding), yPositionForHeaders)

      // We will also need some way to track these xPositions and the column width,
      // So let's push them to an array that will key off of their index
      xPositions.push(index === 0 ? xPositionForCurrentHeader:(xPositionForCurrentHeader + padding))
    }
  })

  doc.line(pageMarginX, pageMarginY + 3.5, liveArea.width , pageMarginY + 3.5)

  const baseYPosForRows = pageMarginY + padding
  let nextYPos = baseYPosForRows + 5


  // ROWS
  for (let rIndex = 0; rIndex < data.length; rIndex++) {
    let row=data[rIndex]

  // data.forEach(async (row, rIndex) => {
    // Here we are going to collect all columns potential max heights
    // Before we determine the nextYPosition we have to grab the tallest value
    // and add that to the previous height.
    // if(rIndex>20) return

    // console.log('printToPdf111 rIndex ',rIndex )
    if(p.do_break && p.do_break()){
      return null
    }

    if(p.refresh_state){
      p.refresh_state({pdf_output_finished:rIndex})
      if (rIndex % 10 === 0) { await pause() }
    }

    const rowHeights = []

    /*
    *
    * Row styles go here
    *
    * */

    // COLUMNS
    headers.forEach((column, cIndex) => {
      const longText = doc.splitTextToSize(String(row[column.key]), xPositions[cIndex] - xPositions[cIndex !== 0 && cIndex - 1] )
      // console.log(longText)
      const rowHeight = longText.length * doc.getLineHeight()
      rowHeights.push(rowHeight)

      /*
      *
      *  Column styles go here
      *
      * */

      doc.text(longText, xPositions[cIndex], nextYPos)
      // if (_row[column.subKey]) {
      //   const longMeta = doc.splitTextToSize(_row[column.subKey], column.width)
      //   doc.text(longMeta, 50, nextYPos + 25)
      // }

      if(4===cIndex) {
        const kImg=0.2
        let iLeft = xPositions[cIndex]-50,
            iTtop = nextYPos+5,
            imgWidth = 150 * kImg,
            imgHeight = 110 * kImg

        doc.addImage(data[rIndex].main_image_url, 'PNG', iLeft, iTtop, imgWidth, imgHeight);

        // getDataUri(imgUrl).then((res:any)=>{
        //   console.log('rrr 111',res )
        //   doc.addImage(res, 'PNG', iLeft, iTtop, imgWidth, imgHeight);
        // })


      }

    })

    nextYPos = nextYPos + padding + Math.max(...rowHeights, 30)

    // When generating looped data, you may need to add pages manually.
    // The good thing is that we've defined our live area boundaries,
    // and can add a new page when our yPosition exceeds them. We need
    // to take some care to reset the yPosition because if you don't:
    // the yPosition will persist to the next page, and more than likely
    // disappear from view as your yPosition grows.
    if (nextYPos > liveArea.height) {
      doc.addPage()
      nextYPos = baseYPosForRows
    }
  }
  //)

  if(p.on_finish){
    p.on_finish()
  }


  if(p.do_break && p.do_break()){
    return null
  }

  doc.save(filename)
  window.open(doc.output("bloburl"))

}

export {pdfTableData_demo, pdfTableHeaders_demo, pdfFileName_demo}

export default pdfTableOutput
