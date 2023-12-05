import { Alert, Button, Table } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { IconCircleCheckFilled } from "@tabler/icons-react";

function Admin() {
  const [userReg, setUserReg] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const icon = <IconCircleCheckFilled />;

  useEffect(() => {
    const fetchUserReg = async () => {
      axios
        .get("http://localhost:4000/api/users")
        .then((res) => {
          setUserReg(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchUserReg();
  }, []);

  const handleSendEmail = async (id) => {
    try {
      setShowAlert(false);
      setLoading(true);
      const response = await axios.post(
        `http://localhost:4000/api/users/send-verification-email/${id}`
      );
      setShowAlert(true);
      console.log(response.data);
    } catch (error) {
      console.error("Error sending verification email:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const rows = userReg.map((user) => (
    <Table.Tr key={user._id}>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>{user.name}</Table.Td>
      <Table.Td>{user.identityCard}</Table.Td>
      <Table.Td>{user.verified.toString()}</Table.Td>
      <Table.Td>
        <Button
          variant="filled"
          onClick={() => handleSendEmail(user._id)}
          disabled={loading ? true : false}
        >
          Send
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <br />
      {showAlert && (
        <Alert
          variant="filled"
          color="blue"
          radius="xs"
          withCloseButton
          title="Succes"
          icon={icon}
          onClose={() => setShowAlert(false)}
        >
          Verification email sent successfully.
        </Alert>
      )}
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Email</Table.Th>
            <Table.Th>Nama</Table.Th>
            <Table.Th>IdentityCard</Table.Th>
            <Table.Th>Verified</Table.Th>
            <Table.Th>Action</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}

export default Admin;
