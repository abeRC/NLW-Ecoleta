import multer from "multer";
/*multer é legal para mexer com upload de imagens */
import path from "path";
import crypto from "crypto";

export default {
	storage: multer.diskStorage({
		destination: path.resolve(__dirname, "..", "..", "uploads" ),
		
		/*Usamos isto porque deixar o usuário escolher o nome é megaburrada.*/
		filename(request, file, callback) {
			const hash = crypto.randomBytes(6).toString("hex");

			const filename= `${hash}-${file.originalname}`;

			callback(null, filename);
		}
	})
};