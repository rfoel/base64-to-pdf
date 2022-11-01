import { Alert, Button, List, Modal, TaskBar, TextArea } from '@react95/core'
import { Access223, BatExec, FileText } from '@react95/icons'
import { useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import styled from 'styled-components'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`

const Window = styled.div`
  padding: 24px;

  form {
    display: flex;
    flex-direction: column;

    textarea {
      margin: 8px 0;
      width: 300px;
    }
  }

  embed {
    height: 80vh;
    width: 80vw;
  }
`

const Icon = styled.button`
  all: unset;
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 4px;

  * {
    cursor: pointer;
  }
`

function App() {
  const [showModal, setShowModal] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [base64, setBase64] = useState('')
  const textarea = useRef<HTMLTextAreaElement>(null)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    if (
      /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/.test(
        event.currentTarget.base64.value,
      )
    )
      setBase64(event.currentTarget.base64.value)
    else setShowAlert(true)
  }

  return (
    <Window>
      {showModal ? (
        <Modal
          closeModal={() => setShowModal(false)}
          defaultPosition={{
            x: Math.floor(window.innerWidth / 2) - 150,
            y: Math.floor(window.innerHeight / 2) - 180,
          }}
          icon={<BatExec variant='32x32_4' />}
          title='Decode base64'
        >
          Paste a base64 PDF string
          <form onSubmit={handleSubmit}>
            <TextArea name='base64' ref={textarea} rows={10} />
            <Button type='submit'>Decode</Button>
          </form>
        </Modal>
      ) : null}
      {showAlert ? (
        <Alert
          title='Decode'
          type='error'
          message='The input is not a base64 string'
          closeAlert={() => setShowAlert(false)}
          buttons={[{ value: 'OK', onClick: () => setShowAlert(false) }]}
        />
      ) : null}
      {base64 ? (
        <Modal
          closeModal={() => setBase64('')}
          icon={<FileText variant='32x32_4' />}
          menu={[
            {
              name: 'File',
              list: (
                <List style={{ zIndex: 1 }}>
                  <List.Item
                    onClick={() => {
                      const downloadLink = document.createElement('a')
                      const fileName = 'decoded pdf.pdf'
                      downloadLink.href = `data:application/pdf;base64,${base64}`
                      downloadLink.download = fileName
                      downloadLink.click()
                    }}
                  >
                    Download
                  </List.Item>
                </List>
              ),
            },
          ]}
          title='pdf'
        >
          <Document file={`data:application/pdf;base64,${base64}`}>
            <Page pageNumber={1} />
          </Document>
        </Modal>
      ) : null}
      <Icon onClick={() => setShowModal(true)}>
        <BatExec variant='32x32_4' />
        decode.exe
      </Icon>
      <TaskBar
        list={
          <List>
            <List.Item
              icon={<Access223 variant='32x32_4' />}
              onClick={() =>
                window
                  .open('https://github.com/rfoel/base64-to-pdf', '_blank')
                  ?.focus()
              }
            >
              Source Code
            </List.Item>
          </List>
        }
      />
    </Window>
  )
}

export default App
