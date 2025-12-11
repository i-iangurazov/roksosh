'use client';

import React from 'react';
import Image from 'next/image';
import { Tab } from '@headlessui/react';

import { Image as ImageType } from '@/types';

import GalleryTab from '@/components/gallery/gallery-tab';

// const MagnifyImage = ({
//   image,
//   alt,
//   zoom = 2,
//   lensSize = 160,
// }: {
//   image: string;
//   alt: string;
//   zoom?: number;
//   lensSize?: number;
// }) => {
//   const containerRef = React.useRef<HTMLDivElement | null>(null);
//   const [showLens, setShowLens] = React.useState(false);
//   const [coords, setCoords] = React.useState({ x: 0, y: 0 });

//   const handleMove: React.MouseEventHandler<HTMLDivElement> = (event) => {
//     if (!containerRef.current) return;

//     const rect = containerRef.current.getBoundingClientRect();
//     const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
//     const y = Math.max(0, Math.min(event.clientY - rect.top, rect.height));

//     setCoords({ x, y });
//   };

//   const handleEnter = () => {
//     if (containerRef.current) {
//       const rect = containerRef.current.getBoundingClientRect();
//       setCoords({ x: rect.width / 2, y: rect.height / 2 });
//     }
//     setShowLens(true);
//   };

//   const containerWidth = containerRef.current?.clientWidth || 1;
//   const containerHeight = containerRef.current?.clientHeight || 1;

//   // 1) Make the background bigger than the container: this is the actual "zoom"
//   const backgroundSize = `${containerWidth * zoom}px ${containerHeight * zoom}px`;

//   // 2) Offset so that the point under the cursor ends up at the center of the lens
//   const backgroundPosition = `
//     ${lensSize / 2 - coords.x * zoom}px
//     ${lensSize / 2 - coords.y * zoom}px
//   `;

//   return (
//     <div
//       ref={containerRef}
//       onMouseEnter={handleEnter}
//       onMouseLeave={() => setShowLens(false)}
//       onMouseMove={handleMove}
//       className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100"
//     >
//       <Image
//         src={image}
//         alt={alt}
//         fill
//         className="object-cover object-center"
//         sizes="(min-width: 1024px) 500px, 100vw"
//         priority
//       />

//       {showLens && (
//         <div
//           className="pointer-events-none absolute rounded-full border border-white shadow-xl"
//           style={{
//             width: lensSize,
//             height: lensSize,
//             left: coords.x - lensSize / 2,
//             top: coords.y - lensSize / 2,
//             backgroundImage: `url(${image})`,
//             backgroundRepeat: 'no-repeat',
//             backgroundSize,
//             backgroundPosition,
//             zIndex: 10,
//           }}
//         />
//       )}
//     </div>
//   );
// };

const Gallery = ({
	images,
	productName,
	lensSize,
}: {
	images: ImageType[];
	productName: string;
	lensSize?: number;
}) => {
	const resolvedLensSize = lensSize ?? 200;

	return (
		<Tab.Group as='div' className='flex flex-col-reverse max-w-lg'>
			<div className='mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none'>
				<Tab.List className='grid grid-cols-4 gap-2'>
					{images.map((image) => (
						<GalleryTab key={image.id} image={image} imageAlt={productName} />
					))}
				</Tab.List>
			</div>
			<Tab.Panels className='space-y-4 sm:space-y-0'>
				{images.map((image) => (
					<Tab.Panel key={image.id}>
						{/* <div className='hidden sm:block'>
							<MagnifyImage image={image.url} alt={productName} lensSize={resolvedLensSize} zoom={2} />
						</div> */}
						<div className=''>
							<Image
								src={image.url}
								alt={productName}
								width={500}
								height={500}
								className='aspect-square relative h-full w-full sm:rounded-lg
								overflow-hidden object-cover object-center'
							/>
						</div>
					</Tab.Panel>
				))}
			</Tab.Panels>
		</Tab.Group>
	);
};

export default Gallery;
