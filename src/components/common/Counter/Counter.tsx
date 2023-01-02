import { Button, Typography } from '@material-tailwind/react'
import type { FC } from 'react'
import React from 'react'

type CounterType = {
  title: string
  incrementBy: number
  decrementBy: number
}

const Counter: FC<CounterType> = ({ title, incrementBy, decrementBy }) => {
  const [count, setCount] = React.useState(0)

  return (
    <div className="h-[300px] w-[300px] shadow-lg">
      <Typography
        aria-label="counter title"
        variant="h1"
        className="my-10 text-center text-indigo-700"
      >
        {title}
      </Typography>

      <div className="flex items-center justify-center gap-6 ">
        <Button
          aria-label="decrement"
          color="red"
          onClick={() => setCount(count - decrementBy)}
        >
          -
        </Button>
        <Typography
          aria-label="count"
          className="w-20 text-center"
          variant="h3"
          color={count <= 0 ? 'red' : 'blue'}
        >
          {count}
        </Typography>
        <Button
          aria-label="increment"
          onClick={() => setCount(count + incrementBy)}
        >
          +
        </Button>
      </div>
    </div>
  )
}

export default Counter
