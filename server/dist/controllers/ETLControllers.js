"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETLControllers = void 0;
const multer_1 = __importDefault(require("multer"));
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.resolve('uploads')); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        cb(null, `${timestamp}_${file.originalname}`); // Use the original file name
    }
});
const fileFilter = (req, file, cb) => {
    // Validate the file type if needed
    // For example, only allow .xlsx files
    if (file.mimetype !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        return cb(new Error('Invalid file type. Only .xlsx files are allowed.'));
    }
    cb(null, true);
};
const upload = (0, multer_1.default)({ storage, fileFilter });
class ETLControllers {
    upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('upload');
            try {
                yield upload.single('file')(req, res, (error) => {
                    if (error) {
                        return res.status(400).json({ error: error.message });
                    }
                    if (!req.file) {
                        return res.status(400).json({ error: 'No file uploaded' });
                    }
                    const uploadedFile = req.file;
                    const filePath = path_1.default.join(__dirname, '../../', 'python_scripts', 'script.py');
                    console.log(uploadedFile.path);
                    const childProcess = (0, child_process_1.spawn)('python', [filePath, uploadedFile.path]);
                    let stdoutData = '';
                    let stderrData = '';
                    childProcess.stdout.on('data', (data) => {
                        stdoutData += data.toString();
                    });
                    childProcess.stderr.on('data', (data) => {
                        stderrData += data.toString();
                    });
                    childProcess.on('error', (err) => {
                        console.error('Child process error:', err);
                        return res.status(500).json({ error: 'Failed to process the file' });
                    });
                    childProcess.on('exit', (code) => {
                        if (code === 0) {
                            // File processed successfully
                            return res.json({ message: 'File uploaded and processed successfully', stdout: stdoutData, stderr: stderrData });
                        }
                        else {
                            console.error('Child process exited with code:', code);
                            console.error('Child process stderr:', stderrData);
                            return res.status(500).json({ error: 'Failed to process the file', stdout: stdoutData, stderr: stderrData });
                        }
                    });
                });
            }
            catch (error) {
                console.error('An error occurred:', error);
                return res.status(500).json({ error: 'Failed to upload the file' });
            }
        });
    }
    download(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const filePath = path_1.default.join(__dirname, '../../templates/TEMPLATE_BASE_DADOS1.2.xlsx'); // Caminho para o arquivo no servidor
            const fileName = 'TEMPLATE_BASE_DADOS1.2.xlsx';
            response.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
            // Envie o arquivo como resposta
            response.sendFile(filePath);
        });
    }
}
exports.ETLControllers = ETLControllers;
