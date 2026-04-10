// Type declarations for CSS imports
declare module "*.css" {
  const content: any;
  export default content;
}

// Type declarations for CSS modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// Type declarations for SCSS
declare module "*.scss" {
  const content: any;
  export default content;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}