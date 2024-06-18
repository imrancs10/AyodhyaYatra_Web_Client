const renderImage = (row, header) => {
  debugger;
  let images = row?.images ?? [];
  images = images.find(x => x.fileType?.toLowerCase() === "image");
  if (images === undefined)
    images = [];
  debugger
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
  let Url = row?.video360URL ?? '';
  if (Url != '')
    return <a target="_blank" style={{color:"black",cursor:"pointer"}} href={Url} title={Url}>{Url}</a>
  else
    return '';
}

const headerFormat = {
  attractionDetails: [
    { name: "Name (Eng)", prop: "enName" },
    { name: "Name (हिंदी)", prop: "hiName" },
    { name: "Lat.", prop: "latitude" },
    { name: "Long.", prop: "longitude" },
    { name: "Type", prop: "attractionType" },
    { name: "Description (Eng)", prop: "enDescription", customColumn: (data) => { return data?.enDescription.substr(0, 100) + "...." }, action: { dAlign: "start" } },
    { name: "Description (हिंदी)", prop: "hiDescription", customColumn: (data) => { return data?.hiDescription.substr(0, 100) + "...." }, action: { dAlign: "start" } },
    { name: "360 Degree Video URL", prop: "video360URL" ,customColumn:redirectURL },
    { name: "Images", prop: "Images", customColumn: renderImage }
  ],
  attractionTypeDetails: [
    { name: "Name", prop: "name" },
    { name: "Code", prop: "code" }
  ],
  visitorDetails: [
    { name: "Name", prop: "name" },
    { name: "Mobile", prop: "mobile" },
    { name: "Document Type", prop: "documentType" },
    { name: "Document Number", prop: "documentNumber" },
    { name: "Registration Date", prop: "registrationDate" }, 
    { name: "Address", prop: "address" },
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
    {
      name: "Description (Eng)", prop: "enDescription", customColumn: (data) => {
        if (data?.enDescription?.length > 40)
          return data?.enDescription.substr(0, 40) + " ..."
        else
          return data?.enDescription;
      }, action: { dAlign: "start" }
    },
    { name: "Description (हिंदी)", prop: "hiDescription", customColumn: (data) => {
      if (data?.hiDescription?.length > 40)
        return data?.hiDescription.substr(0, 40) + " ..."
      else
        return data?.hiDescription;
    }, action: { dAlign: "start" } },
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
  charityDetails: [
    { name: "Name", prop: "charityName" },
    { name: "Charity Type", prop: "charityType" },
    { name: "Charity Purpose", prop: "charityPurpose" },
    { name: "Email", prop: "email" },
    { name: "Mobile", prop: "mobile" },
    { name: "Address", prop: "address" }
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