import * as uuid from 'uuid';
import path from 'path';
import fs from 'fs';

class SaveFiles {
	uploadFiles(file) {
		try {
			this.createDirectory();
			const fileName = uuid.v4() + '.jpg';
			const filePath = path.resolve('static', fileName);
			file.mv(filePath);
			return fileName;
		} catch (error) {
			console.log(error);
		}
	}

	createDirectory() {
		fs.mkdir('static', { recursive: true }, (err) => {
			if (err) throw err;
		});
	}

	removeFile(file) {
		fs.unlink('static/' + file, (err) => {
			if (err) throw err;
		});
	}
}

export default new SaveFiles();
