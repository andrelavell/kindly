import Image, { ImageProps } from 'next/image';
import { imageSizeConfigs } from '../types/image-sizes';
import path from 'path';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  imageType?: keyof typeof imageSizeConfigs;
}

export function OptimizedImage({ 
  src, 
  imageType,
  ...props 
}: OptimizedImageProps) {
  // Determine image type from src if not provided
  if (!imageType) {
    const filename = src.split('/').pop() || '';
    if (filename.includes('hero')) imageType = 'hero.jpg';
    else if (filename.includes('profile') || filename.includes('team')) imageType = 'profile';
    else if (filename.includes('feature')) imageType = 'feature';
    else if (filename.includes('logo')) imageType = 'logo';
    else imageType = 'feature';
  }

  const config = imageSizeConfigs[imageType];
  
  // Generate srcSet using the optimized images
  const extension = path.extname(src);
  const basePath = src.slice(0, -extension.length);
  
  // Default sizes based on image type
  const defaultSizes = {
    'hero.jpg': '100vw',
    'profile': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    'feature': '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    'logo': '(max-width: 640px) 150px, 200px'
  };

  return (
    <Image
      {...props}
      src={src}
      sizes={props.sizes || defaultSizes[imageType]}
      quality={config.quality}
    />
  );
}
