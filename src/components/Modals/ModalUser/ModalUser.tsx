import { Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spinner } from "@chakra-ui/react";
import { IUsers } from "../../../Interfaces/IUsers";
import * as yup from 'yup'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getUserById } from "../../../services/users";
import InputMask from "react-input-mask";
interface ModalUserProps {
  isOpen: boolean;
  onClose: () => void;
  id?: number | string;
  title: string | undefined;
  isEdit?: boolean;
  isVisualization?: boolean;
  fnMutation: unknown;
  setId: (id: number | string ) => void;
}
type InputFields = {
  label: 'nome' | 'email' | 'perfil' | 'telefone' | 'idade';
  type: string;
  maxLength?: number;
  minLegth?: number;
  placholder: string;
  options?: {
    value: string
  }[],
}
const inputsFields: InputFields[] = [
  {
    label: 'nome',
    type: 'text',
    placholder: 'Digite o nome do usuário',
    maxLength: 100,
    minLegth: 3
  },
  {
    label: 'email',
    type: 'email',
    placholder: 'Digite o email',
  },
  {
    label: 'perfil',
    type: 'select',
    options: [
      {
        value: 'Administrador'
      },
      {
        value: 'Usuário Comum'
      }
    ],
    placholder: 'Digite o email',
  },
  {
    label: 'telefone',
    type: 'text',
    placholder: 'Digite o telefone',
  },
  {
    label: 'idade',
    type: 'number',
    placholder: 'Digite a idade',
  }
]
export default function ModalUser({ isOpen, onClose, title, isVisualization, isEdit, id, fnMutation, setId }: ModalUserProps) {
  const { data: User, isLoading } = useQuery({ queryKey: ['user', id], queryFn: () => getUserById(id), enabled: !!id })
  const queryClient = useQueryClient()
  const userSchema = yup.object({
    nome: yup.string().required("Nome é obrigatório"),
    email: yup.string().email().required("Email é obrigatório"),
    perfil: yup.string().required("Perfil é obrigatório"),
    telefone: yup.string().required("Telefone é obrigatório"),
  })
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    values: User?.data,
    resolver: yupResolver(userSchema)
  });
  const mutation = useMutation({  
    mutationFn: (data: IUsers) => fnMutation(isEdit ? id : data, data),
    onSuccess: () => {
      reset()
      toast.success(`Usuário ${isEdit ? 'editado' : 'criado'}  com sucesso`)
      setId('')
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
    onError: (error) => {
      console.log(error)
      toast.error(`Erro ao ${isEdit ? 'editar' : 'criar'} usuário`)
    }
  })

  function onSubmit(data: IUsers) {
    mutation.mutate(data)
    onClose()
    
  }

  function handleClose() {
    reset()
    onClose()
    setId('')
  }
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {isLoading ? <Spinner /> : <form id="forms" onSubmit={handleSubmit((data) => onSubmit(data))}>
            {inputsFields.map((input, index) => {
              return (
                <FormControl mt="1rem" mb="1rem" key={index}>
                  <FormLabel>
                    {input.label.charAt(0).toUpperCase() + input.label.slice(1)}
                  </FormLabel>
                  {input.type === 'select' ? <Select disabled={isVisualization} {...register(input.label)}>
                    {input.options?.map((option, index) => {
                      return (
                        <option key={index} value={option.value}>{option.value}</option>
                      )
                    })}
                  </Select> : <Input as={input.label === 'telefone' ? InputMask : null} mask={input.label === 'telefone' ? '(**) * ****-****' : null} disabled={isVisualization} {...register(input.label, { maxLength: input?.maxLength, minLength: input?.minLegth, valueAsNumber: input.type === 'number' })} type={input.type} placeholder={input.placholder} />}
                  {errors[input.label]?.message ? <p>{errors[input.label]?.message}</p> : null}
                </FormControl>
              )
            })}
          </form>}
        </ModalBody>
        <ModalFooter>
          <Flex gap="2rem" w={"100%"} alignItems={'center'} justifyContent={'center'}>
            {!isVisualization ? <Button type="submit" form="forms" colorScheme='green'>{isEdit ? 'Editar usuário' : 'Adicionar usuário'}</Button> : null}
            <Button onClick={handleClose} variant='ghost'>{isVisualization ? 'Fechar' : 'Cancelar'}</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}