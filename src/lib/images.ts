import axios from "axios";

export type Image = {
  id: string;
  path: string;
  name: string;
  createdAt: Date;
};

export const uploadImages = async (
  files: Express.Multer.File[]
): Promise<Image[]> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append(
      "files",
      new Blob([file.buffer], {
        type: file.mimetype,
      }),
      file.originalname
    );
  });

  const { data } = await axios.post(
    `${process.env.NEXT_PUBLIC_IMAGES_URL}upload`,
    formData,
    {
      headers: {
        Authorization: process.env.IMAGES_SECRET,
      },
    }
  );

  return data.images;
};