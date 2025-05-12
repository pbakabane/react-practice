import { Box, Button, ChakraProvider, Checkbox, defaultSystem, Flex, Input, Text } from '@chakra-ui/react'
import './App.css'

function App() {
  const testData = [
    // 支出と入金のデータを作成
    {
      id: 1,
      title: 'お金を払う',
      isIncome: false,
      amount: 1000,
    },
    {
      id: 2,
      title: 'お金をもらう',
      isIncome: true,
      amount: 1000,
    },
  ]
  return (
    <ChakraProvider value={defaultSystem}>
      <div>
        <Text fontSize="2xl">家計簿アプリ</Text>
        <Box mb="8px">
          <Input placeholder='支出を入力' mb="4px" />
          <Flex align="center" justifyContent="space-between">
            <Checkbox.Root defaultChecked w="100px">
              <Checkbox.HiddenInput />
              <Checkbox.Control />
              <Checkbox.Label>入金</Checkbox.Label>
            </Checkbox.Root>
            <Button colorScheme="teal">追加</Button>
          </Flex>
        </Box>
        <div>
          {testData.map((data) => (
            <div key={data.id}>
              <Flex align="center" justifyContent="space-between">
                <Text>{data.title}</Text>
                <Text>{data.isIncome ? "+" : "-"}{data.amount}</Text>
              </Flex>
            </div>
          ))}
        </div>
      </div>
    </ChakraProvider>
  )
}

export default App
