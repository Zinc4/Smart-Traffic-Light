import { AppShell, Drawer, SimpleGrid } from "@mantine/core";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";
import NavbarMap from "../components/NavbarMap";
import { useState } from "react";
import HospitalList from "../components/HospitalList";
import { useNavigate } from "react-router-dom";

function AppLayout() {
  const [opened, setOpened] = useState(false);
  const navigate = useNavigate();

  function handleOpen() {
    setOpened(true);
  }

  return (
    <AppShell
      header={{}}
      navbar={{
        width: 70,
        breakpoint: "sm",
      }}
    >
      <AppShell.Navbar p="md" pos="absolute">
        <NavbarMap onOpen={handleOpen} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Drawer
          opened={opened}
          onClose={() => {
            setOpened(false);
            navigate("/app");
          }}
          size="lg"
          zIndex={1000}
          position="left"
          title="Daftar Rumah Sakit"
        >
          <SimpleGrid cols={2}>
            <HospitalList />
          </SimpleGrid>
        </Drawer>
        <Map />
      </AppShell.Main>
    </AppShell>

    // <div className={styles.app}>
    //     <Map />
    //   </div>
  );
}

export default AppLayout;
