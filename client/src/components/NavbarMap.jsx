import { ActionIcon, Center, Group, Stack, ThemeIcon } from "@mantine/core";
import { IconBuildingHospital, IconHome, IconMap2 } from "@tabler/icons-react";

import styles from "./NavbarMap.module.css";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

function NavbarMap({ onOpen }) {
  return (
    <div className={styles.navbar}>
      <Center>
        <IconMap2 size={30} />
      </Center>
      <div className={styles.icon}>
        <Stack align="center" gap="xl">
          <Link to="/" style={{ textDecoration: "none" }}>
            <ActionIcon variant="filled" size="lg" radius="md">
              <IconHome />
            </ActionIcon>
          </Link>
          <NavLink to="rs">
            <ActionIcon variant="filled" size="lg" radius="md" onClick={onOpen}>
              <IconBuildingHospital onClick={() => onOpen(true)} />
            </ActionIcon>
          </NavLink>
        </Stack>
      </div>
    </div>
  );
}

export default NavbarMap;
