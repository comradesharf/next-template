export const FileUploadKeyPrefixes = ["avatars", "company_logos"] as const;

export type FileUploadKeyPrefix = (typeof FileUploadKeyPrefixes)[number];
