import { Modal } from "@mantine/core";

function TfConf({ opened, close, selectedTf }) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title="Traffic Light Configuration"
      style={{ zIndex: 1000, position: "absolute" }}
      centered
      withOverlay={false}
    >
      {selectedTf.name}
    </Modal>
  );
}

export default TfConf;
