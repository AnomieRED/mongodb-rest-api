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

	async createDirectory() {
		try {
			fs.mkdir('static', { recursive: true }, (err) => {
				if (err) throw err;
			});
		} catch (error) {
			console.log(error);
		}
	}

	async removeFile(file) {
		try {
			fs.unlink('static/' + file, (err) => {
				if (err) throw err;
			});
		} catch (error) {
			console.log(error);
		}
	}
}

export default new SaveFiles();
