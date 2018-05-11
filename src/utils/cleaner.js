const clean = (data) => {
	if (typeof data === 'object' && Array.isArray(data)) {
		return data.map((value) => clean(value));
	} else if (Buffer.isBuffer(data)) {
		return data.toString();
	} else if (typeof data === 'object') {
		return Object.keys(data).reduce((result, key) => ({
			...result,
			[key]: clean(data[key]),
		}), {});
	}

	return data;
};

const cleaner = (torrent) => {
	const cleanTorrent = clean(torrent);

	if (cleanTorrent.info && cleanTorrent.info.pieces) {
		delete cleanTorrent.info.pieces;
	}

	return cleanTorrent;
};

export default cleaner;