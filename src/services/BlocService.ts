import axios, { AxiosResponse } from "axios";
import { endpoint } from "../constants";
import { Bloc } from "../types/Bloc";
import { ElementBloc } from "../types/elementBloc";
import { GalleryFormData } from "../types/Galerie";
import { BlocOption } from "../types/BlocOptions";

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
      `${endpoint}/api/blocs/${id}`,
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

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("typeBloc", formData.typeBloc);

    formData.elementsBloc.forEach((element: ElementBloc, index: number) => {
      switch (element.type) {
        case "photo":
        case "video":
        case "audio":
          if (element.file) {
            formDataToSend.append(`elementsBloc[${index}][type]`, element.type);
            formDataToSend.append(`elementsBloc[${index}][data]`, element.file);
          }
          break;
        case "gallery":
          if (Array.isArray(element.data)) {
            element.data.forEach((galleryItem: any, galleryIndex: number) => {
              formDataToSend.append(
                `elementsBloc[${index}][type]`,
                element.type
              );
              formDataToSend.append(
                `elementsBloc[${index}][data][${galleryIndex}][photo]`,
                galleryItem.photo
              );

              formDataToSend.append(
                `elementsBloc[${index}][data][${galleryIndex}][title]`,
                galleryItem.title
              );

              formDataToSend.append(
                `elementsBloc[${index}][data][${galleryIndex}][description]`,
                galleryItem.description
              );

              formDataToSend.append(
                `elementsBloc[${index}][data][${galleryIndex}][url]`,
                galleryItem.url
              );
            });
          }
          break;
        default:
          formDataToSend.append(`elementsBloc[${index}][type]`, element.type);
          formDataToSend.append(`elementsBloc[${index}][data]`, element.data);
          break;
      }

      //@ts-expect-error
      if (Array.isArray(element.options_bloc)) {
        //@ts-expect-error
        element.options_bloc.forEach(
          (option: BlocOption, optionIndex: number) => {
            formDataToSend.append(
              `elementsBloc[${index}][options_bloc][${optionIndex}][name]`,
              option.name
            );
            formDataToSend.append(
              `elementsBloc[${index}][options_bloc][${optionIndex}][type]`,
              option.type
            );
            formDataToSend.append(
              `elementsBloc[${index}][options_bloc][${optionIndex}][value]`,
              option.value
            );
          }
        );
      }
    });

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

export const updateBloc = async (id: number, formData: Bloc) => {
  try {
    const config = {
      headers: {
        ...getAxiosConfig().headers,
        "Content-Type": "multipart/form-data",
      },
    };

    const formDataToSend = new FormData();
    formDataToSend.append("_method", "put");
    formDataToSend.append("name", formData.name);
    formDataToSend.append("typeBloc", formData.typeBloc);

    formData.elementsBloc.forEach((element: ElementBloc, index: number) => {
      switch (element.type) {
        case "photo":
        case "video":
        case "audio":
          if (element.file) {
            console.log({ element });
            formDataToSend.append(`elementsBloc[${index}][type]`, element.type);
            formDataToSend.append(`elementsBloc[${index}][data]`, element.file);
          }
          break;

        default:
          formDataToSend.append(`elementsBloc[${index}][type]`, element.type);
          formDataToSend.append(`elementsBloc[${index}][data]`, element.data);
          break;
      }

      //@ts-expect-error
      if (Array.isArray(element.options_bloc)) {
        //@ts-expect-error
        element.options_bloc.forEach(
          (option: BlocOption, optionIndex: number) => {
            formDataToSend.append(
              `elementsBloc[${index}][options_bloc][${optionIndex}][name]`,
              option.name
            );
            formDataToSend.append(
              `elementsBloc[${index}][options_bloc][${optionIndex}][type]`,
              option.type
            );
            formDataToSend.append(
              `elementsBloc[${index}][options_bloc][${optionIndex}][value]`,
              option.value
            );
          }
        );
      }
    });
    await axios.post(`${endpoint}/api/blocs/${id}`, formDataToSend, config);
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

export const getWelcomeMessage = async () => {
  try {
    const response: AxiosResponse<Bloc> = await axios.get(
      `${endpoint}/api/welcome-message`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching welcome message: ", error);
    throw error;
  }
};

export const getDefaultMessage = async (): Promise<Bloc> => {
  try {
    const response: AxiosResponse<Bloc> = await axios.get(
      `${endpoint}/api/default-message`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching default message: ", error);
    throw error;
  }
};

export const getMenu = async (): Promise<Bloc> => {
  try {
    const response: AxiosResponse<Bloc> = await axios.get(
      `${endpoint}/api/blocmenus`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching menu bloc: ", error);
    throw error;
  }
};
