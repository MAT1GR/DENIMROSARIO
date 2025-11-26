import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getNewProducts,
  getBestsellerProducts,
  getAllAdminProducts
} from '../controllers/productController.js';

const router = Router();

// --- CONFIGURACIÓN DE MULTER CORREGIDA ---

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // ESTRATEGIA: Salir de la carpeta del backend y entrar a public_html
    // process.cwd() es la carpeta 'backendnuevo'.
    // '..' nos lleva atrás a '/home/denimros/'.
    // Luego entramos a 'public_html/uploads'.
    const uploadPath = path.join(process.cwd(), '../public_html/uploads');
    
    // Si prefieres la ruta absoluta directa, sería: 
    // const uploadPath = '/home/denimros/public_html/uploads';
    
    // Verificamos y creamos el directorio si no existe
    if (!fs.existsSync(uploadPath)) {
      console.log(`[Multer] Creando directorio: ${uploadPath}`);
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// --- RUTAS ---

router.get('/', getAllProducts);
router.get('/all', getAllAdminProducts);
router.get('/newest', getNewProducts);
router.get('/bestsellers', getBestsellerProducts);
router.get('/:id', getProductById);

// Aplicamos el middleware 'upload' para crear y actualizar productos
router.post('/', upload.array('newImages', 10), createProduct);
router.put('/:id', upload.array('newImages', 10), updateProduct);
router.delete('/:id', deleteProduct);

export default router;