'use client';

import { useCallback, useEffect, useRef, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@lib";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faPhoneSlash, faVideo } from "@icons";
import type { RealTimeModalProps } from "./RealTimeModal.types";

const RealTimeModal: React.FC<RealTimeModalProps> = ({ isOpen, onOpenChange }) => {
  const localCamRef = useRef<HTMLVideoElement | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const stopWebCam = useCallback(() => {
    try {
      if (mediaStream) {
        const tracks = mediaStream.getTracks();
        tracks.forEach((track: MediaStreamTrack) => {
          track.stop();
        });
      }
      setMediaStream(null);
    } catch (error) {
      console.error(error);
    }
  }, [mediaStream]);

  useEffect(() => {
    if (!isOpen) return;

    const startWebcam = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: { width: 1280, height: 720 },
        });

        if (localCamRef.current) {
          localCamRef.current.srcObject = stream;
        }
        setMediaStream(stream);
      } catch (error) {
        console.error("Error accessing webcam", error);
      }
    };

    startWebcam();

    return () => {
      stopWebCam();
    };
  }, [isOpen]);

  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        size="full"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeOut",
              },
            },
          }
        }}
        classNames={{
          body: "py-6 w-full h-80",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
      >
        <ModalContent>
          {(close) => (
            <>
              <ModalHeader className="flex flex-col gap-1">On Call</ModalHeader>
              <ModalBody className="relative h-[85%] w-screen">
                <video ref={localCamRef} autoPlay className="h-full w-full object-contain" />
                <div className="absolute top-2/3 right-80 sm:left-80">
                  <video src="https://www.w3schools.com/html/mov_bbb.mp4" autoPlay width={600} className="rounded-lg border-1 border-violet-500 object-contain" />
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button isIconOnly color="default">
                  <FontAwesomeIcon icon={faMicrophone} />
                </Button>

                <Button isIconOnly color="default">
                  <FontAwesomeIcon icon={faVideo} />
                </Button>

                <Button isIconOnly color="danger" onPress={() => {
                  stopWebCam();
                  close();
                }}>
                  <FontAwesomeIcon icon={faPhoneSlash} />
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default RealTimeModal;
