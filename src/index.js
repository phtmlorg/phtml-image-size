import imageSize from 'image-size';
import path from 'path';
import phtml from 'phtml';

export default new phtml.Plugin('phtml-image-size', opts => {
	const config = {
		intrinsicsize: intrinsicsizeOpts.find(intrinsicsize => intrinsicsize === Object(opts).intrinsicsize) || intrinsicsizeOpts[0],
		size: sizeOpts.find(size => size === Object(opts).size) || sizeOpts[0],
		path: [].concat(Object(opts).path || []),
		cache: {}
	};

	return {
		Element (element) {
			const attrs = /^img$/.test(element.name) && element.attrs.toJSON();

			if (!attrs || !attrs.src) {
				return;
			}

			// resolve the image source path
			const paths = config.path.concat(path.dirname(element.source.input.from));

			// get the first available image size
			const size = getImageSize(attrs.src, paths, config.cache);

			if (!size) {
				return;
			}

			if (config.size !== 'ignore') {
				transformSizeAttributes(element, attrs, config, size);
			}

			// { intrinsicsize }
			if (config.intrinsicsize !== 'ignore') {
				transformIntrinsicsizeAttribute(element, attrs, config, size);
			}
		}
	};
});

function transformSizeAttributes (element, attrs, config, size) {
	if (config.size === 'remove') {
		element.attrs.remove({ width: null, height: null });
	} else {
		// determine if both width and height attributes are useful
		const hasUsefulWidth = attrs.width && attrs.width !== 'auto';
		const hasUseulHeight = attrs.height && attrs.height !== 'auto';

		// set width and height, leveraging any use lengths
		const newAttrs = (
			config.size === 'intrinsic' ||
			(!hasUsefulWidth && !hasUseulHeight)
		)
			? {
				width: size.width,
				height: size.height
			}
		: config.size === 'auto' && (!hasUsefulWidth || !hasUseulHeight)
			? {
				width: hasUsefulWidth
					? attrs.width
				: Math.round(Number(attrs.height) * size.height / size.width),
				height: hasUseulHeight
					? attrs.height
				: Math.round(Number(attrs.width) * size.height / size.width)
			}
		: null;

		// update the size attributes
		if (newAttrs) {
			element.attrs.add(newAttrs);
		}
	}
}

function transformIntrinsicsizeAttribute (element, attrs, config, size) {
	if (config.intrinsicsize === 'remove') {
		element.attrs.remove({ intrinsicsize: null });
	} else {
		// set width and height, leveraging any use lengths
		const newAttrs = (
			config.intrinsicsize === 'intrinsic' ||
			(config.intrinsicsize === 'auto' && !attrs.intrinsicsize)
		)
			? {
				intrinsicsize: `${size.width}x${size.height}`
			}
		: null;

		// update the size attributes
		if (newAttrs) {
			element.attrs.add(newAttrs);
		}
	}
}

function getImageSize (id, cwds, cache) {
	const cwd = cwds.shift();
	const src = path.resolve(cwd, id);

	try {
		cache[src] = imageSize(src);
	} catch (error) {
		if (cwds.length) {
			return getImageSize(id, cwds, cache);
		}

		return null;
	}

	return cache[src];
}

const intrinsicsizeOpts = ['auto', 'intrinsic', 'remove', 'ignore'];
const sizeOpts = ['auto', 'intrinsic', 'remove', 'ignore'];
