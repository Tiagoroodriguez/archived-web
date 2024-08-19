import { bucket } from './../firebaseConfig.js';

export const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No se ha subido ninguna imagen');
  }

  // Supongamos que la carpeta la decides según algún parámetro del request, por ejemplo:
  const folder = req.body.folder || 'small'; // Puedes cambiar esto según tu lógica
  const blob = bucket.file(`${folder}/${req.file.originalname}`);

  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
    predefinedAcl: 'publicRead', // Esto hace que el archivo sea público
  });

  blobStream.on('error', (err) => {
    console.error(err);
    res.status(500).send('Error al subir la imagen');
  });

  blobStream.on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    res.status(200).send({ imageUrl: publicUrl });
  });

  blobStream.end(req.file.buffer);
};
