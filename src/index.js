import imageSize from 'image-size';
import path from 'path';
import phtml from 'phtml';

export default new phtml.Plugin('phtml-image-size', opts => {
	const overrideCWD = Object(opts).cwd;
	const overrideAttrs = Object(opts).override;
	const imageSizeCache = {};

	return {
		Element(node) {
			const isImageWithSrc = node.name === 'img' && node.attrs.contains('src');

			if (!isImageWithSrc) {
				return;
			}

			const width = node.attrs.get('width');
			const height = node.attrs.get('height');
			const shouldAssignAttrs = overrideAttrs || !width && !height;

			if (!shouldAssignAttrs) {
				return;
			}

			// resolve the image source path
			const id = node.attrs.get('src');
			const cwd = overrideCWD || path.dirname(node.source.input.from);
			const src = path.resolve(cwd, id);

			// get the natural image size
			const size = imageSizeCache[src] = imageSizeCache[src] || imageSize(src);

			// determine if both width and height attributes are useful
			const hasUsefulWidth = width && width !== 'auto';
			const hasUseulHeight = height && height !== 'auto';
			const hasOnlyOneUsefulLength = hasUsefulWidth && !hasUseulHeight || hasUseulHeight && !hasUsefulWidth;

			// normalized size either leverages an aspect ratio or is the natural size
			const normalizedSize = overrideAttrs === 'auto' && hasOnlyOneUsefulLength
				? {
					width: hasUsefulWidth
						? width
					: Math.round(Number(node.attrs.get('height')) * size.height / size.width),
					height: hasUseulHeight
						? height
					: Math.round(Number(node.attrs.get('width')) * size.height / size.width)
				}
			: {
				width: size.width,
				height: size.height
			};

			// update the size attributes
			node.attrs.add(normalizedSize);
		}
	};
});
