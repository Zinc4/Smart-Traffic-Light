import { Badge, Button, Card, Group, Image, Text } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function HospitalList() {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    const fetchHospitals = async () => {
      axios
        .get("http://localhost:4000/api/hospitals")
        .then((res) => {
          setHospitals(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchHospitals();
  }, []);

  return (
    <>
      {hospitals.map((hospital) => (
        <div key={hospital._id}>
          <Card shadow="sm" p="sm" radius="md" withBorder>
            <Card.Section component="a">
              <Image src={hospital.src} height={160} alt="RS" />
            </Card.Section>

            <Group position="apart" mt="md" mb="xs">
              <Text weight={500}>{hospital.name}</Text>
              <Badge color="green" variant="light">
                Open
              </Badge>
            </Group>

            <Text size="sm" color="dimmed">
              {hospital.addres}
            </Text>
            <Link
              to={`?lat=${hospital.position.lat}&lng=${hospital.position.lng}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="light"
                color="blue"
                fullWidth
                mt="md"
                radius="md"
              >
                Tracking Now
              </Button>
            </Link>
          </Card>
        </div>
      ))}
    </>
  );
}

export default HospitalList;
