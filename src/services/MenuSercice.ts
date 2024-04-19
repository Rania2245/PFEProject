import axios from "axios";
import { endpoint } from "../constants";
import { Menu } from "../types/Menu";
import { ElementBloc } from "../types/elementBloc";

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

export const getMenuById = async (id: number) => {
  try {
    const response = await axios.get<Menu>(
      `${endpoint}/api/menus/${id}`,
      getAxiosConfig()
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching menu with ID ${id}: `, error);
    throw error;
  }
};

export const createMenu = async (menuData: Menu) => {
  try {
    const config = {
      headers: {
        ...getAxiosConfig().headers,
        "Content-Type": "multipart/form-data",
      },
    };

    const formDataToSend = new FormData();
    formDataToSend.append("name", menuData.name);

    menuData.elementsMenu.forEach((element: ElementBloc, index: number) => {
      console.log(menuData.elementsMenu);
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
          if (Array.isArray(element.gallery)) {
            element.gallery.forEach(
              (galleryItem: any, galleryIndex: number) => {
                formDataToSend.append(
                  `elementsBloc[${index}][type]`,
                  element.type
                );
                formDataToSend.append(
                  `elementsBloc[${index}][data][photo]`,
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
              }
            );
          }
          break;
        default:
          formDataToSend.append(`elementsBloc[${index}][type]`, element.type);
          formDataToSend.append(`elementsBloc[${index}][data]`, element.data);
          break;
      }
      //@ts-expect-error
      if (element.options_bloc.length > 0) {
        formDataToSend.append(
          `elementsBloc[${index}][options_bloc]`,
          //@ts-expect-error

          JSON.stringify(element.options_bloc)
        );
      }
    });

    const response = await axios.post<Menu>(
      `${endpoint}/api/menu`,
      formDataToSend,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error creating bloc: ", error);
    throw error;
  }
};

export const updateMenu = async (id: number, menuData: Menu) => {
  try {
    const config = {
      headers: {
        ...getAxiosConfig().headers,
        "Content-Type": "multipart/form-data",
      },
    };

    const formDataToSend = new FormData();
    formDataToSend.append("_method", "put");
    formDataToSend.append("name", menuData.name);

    menuData.elementsMenu.forEach((element: ElementBloc, index: number) => {
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

      if (element.blocOptions) {
        formDataToSend.append(
          `elementsBloc[${index}][options_bloc]`,
          JSON.stringify(element.blocOptions)
        );
      }
    });
    await axios.post(`${endpoint}/api/Menu/${id}`, formDataToSend, config);
  } catch (error) {
    console.error(`Error updating menu with ID ${id}: `, error);
    throw error;
  }
};

export const deleteMenu = async (id: number) => {
  try {
    await axios.delete(`${endpoint}/api/menus/${id}`, getAxiosConfig());
  } catch (error) {
    console.error(`Error deleting menu with ID ${id}: `, error);
    throw error;
  }
};
