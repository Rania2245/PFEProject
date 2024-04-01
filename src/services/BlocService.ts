import axios from "axios";
import { endpoint } from "../constants";
import { Bloc } from "../types/Bloc";
import { ElementBloc } from "../types/elementBloc";
import { GalleryFormData } from "../types/Galerie";

const getAxiosConfig = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    throw new Error("JWT token not found in localStorage");
  }
};
export const duplicateBloc = async (id: number) => {
  try {
    const response = await axios.post<Bloc>(
      `${endpoint}/api/blocs/${id}/duplicate`,
      {},
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Error duplicating bloc with ID ${id}: `, error);
    throw error;
  }
};

export const getBlocById = async (id: number) => {
  try {
    const response = await axios.get<Bloc>(
      `${endpoint}/api/blocs/${id}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching bloc with ID ${id}: `, error);
    throw error;
  }
};
export const createBloc = async (formData: Bloc) => {
  try {
    const config = {
      headers: {
        ...getAxiosConfig().headers,
        "Content-Type": "multipart/form-data",
      },
    };

    console.log({ formData });

    const formDataToSend = new FormData();
    formData.elementsBloc.forEach((element: ElementBloc, index: number) => {
      if (
        element.type === "photo" ||
        element.type === "video" ||
        element.type === "audio"
      ) {
        if (element.file) {
          formDataToSend.append(`elementsBloc[${index}][file]`, element.file);
          formDataToSend.append(
            `elementsBloc[${index}].data`,
            element.file.name
          );
        }
      } else if (element.type === "gallery") {
        if (Array.isArray(element.data)) {
          element.data.forEach(
            (galleryItem: GalleryFormData, galleryIndex: number) => {
              formDataToSend.append(
                `galerie_${index}_${galleryIndex}[photo]`,
                galleryItem.photo
              );
              formDataToSend.append(
                `galerie_${index}_${galleryIndex}[title]`,
                galleryItem.title
              );
              formDataToSend.append(
                `galerie_${index}_${galleryIndex}[description]`,
                galleryItem.description
              );
              formDataToSend.append(
                `galerie_${index}_${galleryIndex}[url]`,
                galleryItem.url
              );
            }
          );
        }
      } else {
        formDataToSend.append(`elementBloc[${index}].data`, element.data);
      }

      formDataToSend.append(`elementsBloc[${index}][type]`, element.type);
      if (element.blocOptions) {
        formDataToSend.append(
          `elementsBloc[${index}].options_bloc[0]`,
          JSON.stringify(element.blocOptions)
        );
      }
    });

    formDataToSend.append("name", formData.name);

    console.log([...formDataToSend]);

    const response = await axios.post<Bloc>(
      `${endpoint}/api/blocs`,
      formDataToSend,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error creating bloc: ", error);
    throw error;
  }
};

export const updateBloc = async (id: number, blocData: Bloc) => {
  try {
    await axios.put(`${endpoint}/api/blocs/${id}`, blocData, getAxiosConfig());
  } catch (error) {
    console.error(`Error updating bloc with ID ${id}: `, error);
    throw error;
  }
};

export const deleteBloc = async (id: Number) => {
  try {
    await axios.delete(`${endpoint}/api/blocs/${id}`, getAxiosConfig());
  } catch (error) {
    console.error(`Error deleting bloc with ID ${id}: `, error);
    throw error;
  }
};
export const getAllBlocs = async () => {
  try {
    const response = await axios.get<Bloc[]>(
      `${endpoint}/api/blocs`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching all blocs: ", error);
    throw error;
  }
};
