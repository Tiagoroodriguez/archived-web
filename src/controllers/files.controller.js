import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

const uploadMulter = multer({ storage: storage });

export const upload = uploadMulter.single('myFile');

export const uploadFiles = (req, res) => {
  try {
    // Verificar si hay un archivo adjunto en la solicitud
    if (!req.file) {
      return res
        .status(400)
        .json({ error: 'No se ha adjuntado ningún archivo.' });
    }

    // Crear la URL del archivo subido
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${
      req.file.filename
    }`;
    console.log('File URL:', fileUrl);
    // Enviar la URL del archivo en la respuesta
    res.send({ data: 'File uploaded successfully', fileUrl: fileUrl });
  } catch (error) {
    console.error('Error al subir el archivo:', error);
    res
      .status(500)
      .json({ error: 'Ha ocurrido un error al subir el archivo.' });
  }
};
