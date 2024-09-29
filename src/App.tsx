import { Button, Flex, Spinner, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import './App.css'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUserById, getUsers, createUsers, updateUsers, deleteUsers } from './services/users'
import { IUsers } from './Interfaces/IUsers'
import ModalUser from './components/Modals/ModalUser/ModalUser'
import { useState } from 'react'
import { IActions } from './Interfaces/IActionsFunctionsUser'
import { toast } from 'react-toastify'
import ReactPaginate from 'react-paginate'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'

const actionsFunctions: IActions = {
  createUser: createUsers,
  viewUser: getUserById,
  updateUser: updateUsers,
}
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [page, setPage] = useState(1)
  const { data: Users, isLoading } = useQuery({ queryKey: ['users', page], queryFn: () => getUsers(page) })
  const [title, setTitle] = useState<string>('')
  const [action, setAction] = useState<(typeof actionsFunctions)[keyof IActions]>()
  const [id, setId] = useState<number | string>()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isVisualization, setIsVisualization] = useState<boolean>(false)
  const queryClient = useQueryClient()
  function handleOpenModal(title: string, action: keyof typeof actionsFunctions, user?: IUsers) {
    setAction(() => actionsFunctions[action])
    setTitle(title)
    if (user) {
      setId(user.id)
    }
    if (action === 'viewUser') {
      setIsVisualization(true)
      setIsEdit(false)
    }

    if (action === 'createUser') {
      setIsEdit(false)
      setIsVisualization(false)
    }
    if (action === 'updateUser') {
      setIsEdit(true)
      setIsVisualization(false)
    }
    onOpen()
  }

  const mutation = useMutation({  
    mutationFn: (id: number) => deleteUsers(id),
    onSuccess: () => {
      toast.success(`usuário deletado com sucesso`)
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: () => {
      toast.error(`Erro ao deletar usuário`)
    }
  })

  async function deleteUser(id: number) {
    mutation.mutate(id)
  }

  function handlePageClick(page: any) {
    setPage(page.selected+ 1)
  }
  return (
    <div>
      <Flex>
        <Button onClick={() => handleOpenModal('Adicionar usuário', 'createUser')} colorScheme='green'>
          Adicionar usuário
        </Button>
      </Flex>
      <ModalUser isEdit={isEdit} setId={setId} isVisualization={isVisualization} fnMutation={action} id={id} isOpen={isOpen} title={title} onClose={onClose} />
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th textAlign='center'>ID</Th>
              <Th textAlign='center'>Nome</Th>
              <Th textAlign='center' >Email</Th>
              <Th textAlign='center' >Perfil</Th>
              <Th textAlign='center' >Telefone</Th>
              <Th textAlign='center' >Idade</Th>
              <Th textAlign='center'>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {!isLoading ? Users?.data.data.map((user: IUsers) => {
              return (
                <Tr>
                  <Td textAlign='center'>{user.id}</Td>
                  <Td textAlign='center'>{user.nome}</Td>
                  <Td textAlign='center'>{user.email}</Td>
                  <Td textAlign='center'>{user.perfil}</Td>
                  <Td textAlign='center'>{user.telefone}</Td>
                  <Td textAlign='center'>{user.idade}</Td>
                  <Td textAlign='center'>
                    <Button colorScheme="teal" size="sm" onClick={() => handleOpenModal('Visualizar usuário', 'viewUser', user)}  mr="2">Visualizar</Button>
                    <Button colorScheme="blue" size="sm" onClick={() => handleOpenModal('Editar usuário', 'updateUser', user)} mr="2">Editar</Button>
                    <Button colorScheme="red" size="sm" onClick={() => deleteUser(user.id as number)}>Excluir</Button>
                  </Td>
                </Tr>
              )
            }) : <Spinner />}
          </Tbody>
        </Table>
      </TableContainer>
      <ReactPaginate
        breakLabel="..."
        nextLabel={
          <ArrowRightIcon />
        }
        containerClassName={'react-paginate'}
        activeClassName={'active'}
        pageClassName={"page-item"}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={Users?.data.meta.totalPages || 0}
        previousLabel={
          <ArrowLeftIcon/>
        }
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default App
