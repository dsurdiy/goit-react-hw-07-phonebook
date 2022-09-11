import { useSelector, useDispatch } from 'react-redux';
import { FcContacts } from 'react-icons/fc';
import { FallingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Container, AppTitle, ContactsTitle } from './App.styled';
import {
  useGetContactsQuery,
  useAddContactMutation,
} from 'redux/contactsSlice';
import { changeFilter } from 'redux/filterSlice';

export const App = () => {
  const { data: contacts, isLoading } = useGetContactsQuery();
  const filter = useSelector(state => state.filter);
  const [addContact] = useAddContactMutation();
  const dispatch = useDispatch();

  const formSubmitHandler = async newContact => {
    const normalizedNewContactsName = newContact.name.toLowerCase();
    const existingСontact = contacts.find(
      ({ name }) => name.toLowerCase() === normalizedNewContactsName
    );

    if (existingСontact) {
      return toast.warn(`${newContact.name} is already in contacts`);
    }

    try {
      await addContact(newContact);
      toast.success(`${newContact.name} successfully added :)`);
    } catch (error) {
      toast.error('Something went wrong :(');
    }
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();

    return contacts?.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleFilterChange = e => {
    const newFilter = e.target.value;
    dispatch(changeFilter(newFilter));
  };

  const isContacts = getFilteredContacts()?.length !== 0;

  return (
    <Container>
      <AppTitle>
        Phonebook <FcContacts size={30} />
      </AppTitle>
      <ContactForm onSubmit={formSubmitHandler} />
      <ContactsTitle>Contacts</ContactsTitle>
      <Filter value={filter} onChange={handleFilterChange} />
      {isLoading ? (
        <FallingLines
          color="#ff7043"
          width="150"
          visible={true}
          ariaLabel="falling-lines-loading"
        />
      ) : (
        <ContactList contacts={getFilteredContacts()} />
      )}
      {!isContacts && <b>There are no contacts...</b>}
      <ToastContainer position="top-center" />
    </Container>
  );
};
