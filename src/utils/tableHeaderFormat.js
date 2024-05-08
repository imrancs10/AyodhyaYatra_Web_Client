const renderImage = (row, header) => {
  let images = row?.images ?? [];
  images = images.find(x => x.imageType?.toLowerCase() === "image");
  if (images === undefined)
    images = [];
  return <img className="grid-image" src={process.env.REACT_APP_API_URL + images?.thumbPath} alt={row?.enName} title={row?.enName} onError={(e) => { e.target.src = "/assets/img/icons/default-image.jpg" }} />
}

const renderFiles = (row, header) => {
  let images = row?.images ?? [];
  images = images.find(x => x.imageType?.toLowerCase() === "file");
  if (images === undefined)
    images = [];
  return <a className="grid-image" src={process.env.REACT_APP_API_URL + images?.filePath} alt={row?.enName} title={row?.enName}></a>
}

const redirectURL = (row, header) => {
  let Url = row?.temple360DegreeVideoURL ?? '';
  if (Url != '')
    return <a target="_blank" src={Url} title={Url}>{Url}</a>
  else
    return '';
}

const headerFormat = {
  attractionDetails: [
    { name: "Name (Eng)", prop: "enName" },
    { name: "Name (हिंदी)", prop: "hiName" },
    { name: "Lat.", prop: "latitude" },
    { name: "Long.", prop: "longitude" },
    { name: "Type", prop: "templeCategoryName" },
    { name: "Description (Eng)", prop: "enDescription",customColumn:(data)=>{return data?.enDescription.substr(0,100)+"...."}, action: { dAlign: "start" } },
    { name: "Description (हिंदी)", prop: "hiDescription",customColumn:(data)=>{return data?.hiDescription.substr(0,100)+"...."},  action: { dAlign: "start" } },
    { name: "360 Degree Video URL", prop: "temple360DegreeVideoURL", customColumn: redirectURL },
    { name: "Images", prop: "Images", customColumn: renderImage }
  ],
  attractionTypeDetails: [
    { name: "Name", prop: "name" },
    { name: "Code", prop: "code" }
  ],
  attractionYatraMapper: [
    { name: "YatraName", prop: "yatraName" },
    { name: "Attraction Name", prop: "masterAttractionName" },
    { name: "Display Order", prop: "displayOrder" }
  ],
  masterDataDetails: [
    { name: "Name (Eng)", prop: "enName" },
    { name: "Name (हिंदी)", prop: "hiName" },
    { name: "Lat.", prop: "latitude" },
    { name: "Long.", prop: "longitude" },
    { name: "Description (Eng)", prop: "enDescription", action: { dAlign: "start" } },
    { name: "Description (हिंदी)", prop: "hiDescription", action: { dAlign: "start" } },
    { name: "Images", prop: "Images", customColumn: renderImage },
  ],
  YatraDetails: [
    { name: "Name (Eng)", prop: "enName" },
    { name: "Name (हिंदी)", prop: "hiName" },
    { name: "Description (Eng)", prop: "enDescription" },
    { name: "Description (हिंदी)", prop: "hiDescription" },
    { name: "Images", prop: "Images", customColumn: renderImage },
  ],
  PadavDetails: [
    { name: "Yatra Name (Eng)", prop: "enYatraName" },
    { name: "Yatra Name (हिंदी)", prop: "hiYatraName" },
    { name: "Padav Name (Eng)", prop: "enPadavName" },
    { name: "Padav Name (हिंदी)", prop: "hiPadavName" },
    { name: "Description (Eng)", prop: "enDescription" },
    { name: "Description (हिंदी)", prop: "hiDescription" },
    { name: "Images", prop: "Images", customColumn: renderImage },
  ],
  NewsUpdateDetails: [
    { name: "Type", prop: "newsUpdateTypeName" },
    { name: "Title (Eng)", prop: "enTitle" },
    { name: "Title (हिंदी)", prop: "hiTitle" },
    { name: "Event Date", prop: "eventDate" },
    { name: "Description (Eng)", prop: "enDescription" },
    { name: "Description (हिंदी)", prop: "hiDescription" },
    { name: "Web Url", prop: "webUrl" },
    { name: "Images", prop: "Images", customColumn: renderImage },
  ],
  PhotoAlbumDetails: [
    { name: "Name (Eng)", prop: "enName" },
    { name: "Name (हिंदी)", prop: "hiName" },
    { name: "Images", prop: "Images", customColumn: renderImage },
  ],
  PhotoGalleryDetails: [
    { name: "Name (Eng)", prop: "enName" },
    { name: "Name (हिंदी)", prop: "hiName" },
    { name: "Album Name", prop: "photoAlbumName" },
    { name: "Images", prop: "Images", customColumn: renderImage },
  ],
  AudioGalleryDetails: [
    { name: "Name (Eng)", prop: "enName" },
    { name: "Name (हिंदी)", prop: "hiName" },
    { name: "Audio", prop: "Images", customColumn: renderImage },
  ],
  VideoGalleryDetails: [
    { name: "Name (Eng)", prop: "enName" },
    { name: "Name (हिंदी)", prop: "hiName" },
    { name: "Video Url", prop: "videoUrl" },
    { name: "Video", prop: "Images", customColumn: renderImage },
  ],
  ThreeSixtyDegreeGalleryDetails: [
    { name: "Name (Eng)", prop: "enName" },
    { name: "Name (हिंदी)", prop: "hiName" },
    { name: "Video Url", prop: "videoUrl" },
    { name: "Video", prop: "Images", customColumn: renderImage },
  ],
  FeedbackDetails: [
    { name: "Name", prop: "name" },
    { name: "Email Id", prop: "emailId" },
    { name: "Contact Number", prop: "contactNumber" },
    { name: "Address", prop: "address" },
    { name: "Feedback Comment", prop: "feedbackComment" },
    { name: "Created At", prop: "createdAt" }
  ],
}

export { headerFormat };