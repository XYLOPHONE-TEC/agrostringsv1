/**
 * @typedef {Object} Clip
 * @property {string} id
 * @property {number} start
 * @property {number} duration
 * @property {string} src
 * @property {number} row
 */

/**
 * @typedef {Object} TextOverlay
 * @property {string} id
 * @property {number} start
 * @property {number} duration
 * @property {string} text
 * @property {number} row
 */

/**
 * @typedef {Object} Sound
 * @property {string} id
 * @property {number} start
 * @property {number} duration
 * @property {string} content
 * @property {number} row
 * @property {string} file
 */

/**
 * @typedef {Object} VideoFile
 * @property {string} link
 * @property {string} quality
 */

/**
 * @typedef {Object} PexelsMedia
 * @property {number} id
 * @property {number} width
 * @property {number} height
 * @property {string} url
 * @property {string} [image]
 * @property {number} [duration]
 * @property {VideoFile[]} [video_files]
 */

/**
 * @typedef {Object} Effect
 * @property {string} id
 * @property {string} type
 * @property {number} start
 * @property {number} duration
 * @property {number} row
 */

// Export as named exports (even though these are type-only)
/** @type {Clip} */
export const Clip = null;

/** @type {TextOverlay} */
export const TextOverlay = null;

/** @type {Sound} */
export const Sound = null;

/** @type {PexelsMedia} */
export const PexelsMedia = null;

/** @type {Effect} */
export const Effect = null;
