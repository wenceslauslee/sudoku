import { Storage } from "aws-amplify";

export async function s3Upload(file, fileContent) {
  var stored;
  if (file !== null) {
  	const filename = `${Date.now()}-${file.name}`;
  	stored = await Storage.vault.put(filename, file, {
  	  level: 'private',
      contentType: file.type
    });
  } else {
  	const filename = `${Date.now()}.txt`;
  	stored = await Storage.vault.put(filename, fileContent, {
  	  level: 'private',
  	  contentType: "text/plain"
  	});
  } 

  return stored.key;
}

export async function s3UploadImage(imageContent) {
  const filename = `${Date.now()}.jpeg`;
  /*const stored = await Storage.vault.put(filename, `data:image/jpeg;base64, ${imageContent}`, {
    level: 'private',
    contentType: "image/jpeg",
    contentEncoding: "base64"
  });*/
  const file = await fetch(imageContent)
    .then(res => res.blob())
    .then(blob => new File([blob], filename))
  //const i = imageContent.indexOf('base64,');
  //const buffer = Buffer.from(imageContent.slice(i + 7), 'base64');
  //const file = new File([atob(imageContent.slice(i + 7))], filename, { type: 'image/jpeg' });
  const stored = await Storage.vault.put(filename, file, {
    level: 'private',
    contentType: "image/jpeg"
  });

  return stored.key;
}
