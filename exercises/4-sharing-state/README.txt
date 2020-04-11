 Sharing State

  This is where closure becomes interesting.
  All the examples and exercises till now have focused on the different ways you can get values into your functions

  This set of examples and exercises gives you the first taste of how closure can be used to build simple applications

  "State" is the value stored by a variable the moment you access it.
  Two frames share state if they have shared access to the same values.

  When two frames share state, that means if one function call changes a variable's value,
    that new value is available when the other function is called.

  Saving and changing state is the beating heart of any application.
  Imagine if every time you logged into your email, all your emails were gone!

  How you store state in your applications,
  and how you do (or don't!) change state from different functions is one of the most important considerations when planning apps

  Below you'll see 2 ways that functions can share state between frames:

  Arguments and Return Values:
    state can be shared between frames using arguments and captured return values.
    this is generally the simplest method to reason about and to debug
    the same arguments will always return the same value not matter what!
    This strategy is called "pure functions".
    once you understand the individual functions, you can understand the whole program.
    To make things even easier, using global const variables will help with debugging by leaving a record of everything that happened

  Closed Variables:
    state changes can be shared more between frames by closed variables.
    Changes made are not available globally, but do show up the next time you call the same function.
    Closures that do not modify their closed variables are "pure functions", the same arguments will always return the same values
    While closures that modify closed variables are not "pure functions", they are can a good way to build your programs.
