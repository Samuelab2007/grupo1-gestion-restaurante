import {
  DELETE_MOVEMENT,
  DELETE_USER,
  GET_CLIENTES,
  GET_MOVEMENT,
} from "@/hooks/react-query/user/user";
import { mainTexts } from "@/types/types";
import { useMutation, useQuery } from "@apollo/client";

import Link from "next/link";

export const SidePanel = () => {
  return (
    <div className="flex">
      <div className="block lg:hidden border-solid border-2 border-[#dc2626] w-full p-2 grid grid-cols-2">
        <div className="col-span-1 my-auto ml-5">
          <Link href="/menuresponsive">
            <img width="30px" src="/icons/menu.svg" alt="" />
          </Link>
        </div>
        <div className="col-span-1">
          <Link href={"/"}>
            <img width="150px" src="/gourmetcode.png" alt="" />
          </Link>
        </div>
      </div>
      <div className="lg:w-full hidden lg:block bg-white text-white h-screen">
        <div className="p-6">
          <Link href={"/"}>
            <img width="150px" src="/gourmetcode.png" alt="" />
          </Link>
          <h1 className="col-span-3 text-2xl font-bold mb-6 text-[#dc2626]">
            Menu
          </h1>
          <ul>
            <ItemSidePanel
              link="/dashboard"
              linkText="Dashboard"
              srcImg="/icons/home.svg"
            ></ItemSidePanel>
            <ItemSidePanel
              link="/dashboard/pedidos"
              linkText="Pedidos"
              srcImg="/icons/orders.svg"
            ></ItemSidePanel>
            <ItemSidePanel
              link="/dashboard/pagos"
              linkText="Pagos"
              srcImg="/icons/pay.svg"
            ></ItemSidePanel>
            <ItemSidePanel
              link="/dashboard/clientes"
              linkText="Clientes"
              srcImg="/icons/clients.svg"
            ></ItemSidePanel>
            <ItemSidePanel
              link="/dashboard/perfil"
              linkText="Mi perfil"
              srcImg="/icons/profile.svg"
            ></ItemSidePanel>
            <ItemSidePanel
              link="/logout"
              linkText="Logout"
              srcImg="/icons/logout.svg"
            ></ItemSidePanel>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const ItemSidePanel = (props: mainTexts) => {
  return (
    <li className="grid grid-cols-6 mb-4">
      <img
        className="col-span-1 m-auto"
        width="25px"
        src={props.srcImg}
        alt=""
      />
      <a
        href={props.link}
        className="col-span-5 text-lg hover:bg-[#dc2626] p-2 rounded block text-black hover:text-white"
      >
        {props.linkText}
      </a>
    </li>
  );
};

export const PedidosBodyDashboard = () => {
  const { data, loading, refetch } = useQuery(GET_MOVEMENT);

  const [deleteInventoryMovement] = useMutation(DELETE_MOVEMENT);

  const handleDeletePedido = async (pedidoId: string) => {
    try {
      await deleteInventoryMovement({ variables: { id: pedidoId } });
      alert("Movimiento borrado con exito");
      refetch();
    } catch (e) {
      alert("No se pudo borrar el movimiento");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:w-full">
      <h1 className="text-3xl font-bold mb-4 text-[#dc2626]">Pedidos</h1>
      <div className="overflow-x-auto">
        <table className="lg:min-w-full bg-white w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Producto</th>
              <th className="py-2 px-4 border-b">Precio</th>
              <th className="py-2 px-4 border-b">Cantidad</th>
              <th className="py-2 px-4 border-b">Estado</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center">
                  Cargando...
                </td>
              </tr>
            ) : (
              data?.getMovement?.map(
                (producto: {
                  id: string;
                  name: string;
                  material: { name: string; price: number };
                  quantity: string;
                  state: string;
                }) => (
                  <ItemCrud
                    key={producto.id + producto.name}
                    id={producto.id}
                    hText={producto.material.name}
                    priceText={`${producto.material.price}`}
                    quantityText={producto.quantity}
                    stateText={producto.state}
                    handleMutationResolver={() => {
                      handleDeletePedido(producto.id);
                    }}
                  ></ItemCrud>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const ClientesBodyDashboard = () => {
  const { data, loading, refetch } = useQuery(GET_CLIENTES);
  const [deleteUser] = useMutation(DELETE_USER);

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser({ variables: { id: userId } });
      alert("Usuario borrado correctamente");
      refetch();
    } catch (e) {
      alert("No se pudo borrar el usuario");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:w-full">
      <h1 className="text-3xl font-bold mb-4 text-[#dc2626]">Clientes</h1>
      <div className="overflow-x-auto">
        <table className="lg:min-w-full bg-white w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b">Email verificado</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <></>
            ) : (
              data?.getClientes?.map(
                (cliente: {
                  id: string;
                  name: string;
                  email: string;
                  emailVerified: boolean;
                  role: { name: string };
                }) => (
                  <tr key={cliente.id + cliente.name}>
                    <td className="py-2 px-4 border-b text-center">
                      {cliente.id}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {cliente.name}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {cliente.email}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {cliente.emailVerified ? "Si" : "No"}
                    </td>

                    <td className="py-2 px-4 border-b space-x-2 text-center">
                      {/*<button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-black">
          Edit
        </button>*/}
                      {cliente.role?.name == "ADMIN" ? (
                        <>Los usuarios admin no se pueden eliminar</>
                      ) : (
                        <button
                          className="bg-[#dc2626] text-white px-4 py-2 rounded hover:bg-black"
                          onClick={() => handleDeleteUser(cliente.id)}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const BodyDashboard = (props: { hText: string }) => {
  if (props.hText == "Pagos") {
    return (
      <div className="min-h-screen bg-gray-100 p-6 md:w-full">
        <h1 className="text-3xl font-bold mb-4 text-[#dc2626]">
          {props.hText}
        </h1>
        <div className="overflow-x-auto">
          <table className="lg:min-w-full bg-white w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Producto</th>
                <th className="py-2 px-4 border-b">Metodo de pago</th>
                <th className="py-2 px-4 border-b">Total</th>
                <th className="py-2 px-4 border-b">Estado</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {/*props.content?.map((producto: any) => (
                <ItemCrud
                  key={producto.id + producto.name}
                  id={producto.id}
                  hText={producto.material.name}
                  priceText={`${producto.material.price}`}
                  quantityText={producto.quantity}
                  stateText={producto.state}
                ></ItemCrud>
              ))*/}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};

export const ItemCrud = (props: {
  id: string;
  hText: string;
  priceText: string;
  quantityText: string;
  stateText: string;
  handleMutationResolver: () => void;
}) => {
  return (
    <tr>
      <td className="py-2 px-4 border-b text-center">{props.id}</td>
      <td className="py-2 px-4 border-b text-center">{props.hText}</td>
      <td className="py-2 px-4 border-b text-center">${props.priceText}</td>
      <td className="py-2 px-4 border-b text-center">{props.quantityText}</td>
      <td className="py-2 px-4 border-b text-center">{props.stateText}</td>
      <td className="py-2 px-4 border-b space-x-2 text-center">
        {/*<button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-black">
          Edit
        </button>*/}
        <button
          className="bg-[#dc2626] text-white px-4 py-2 rounded hover:bg-black"
          onClick={props.handleMutationResolver}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
