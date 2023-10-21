#!/usr/bin/env bats

@test 'Addition using bc' {
    [ $(bc <<< '1+2') = 3 ]
}

@test 'Addition using dc' {
    [ $(dc <<< '1 2 + p') = 3 ]
}
