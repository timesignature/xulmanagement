@component('mail::message')
# Welcome {{$user->name}}

Please, confirm your email address by clicking the link below.
<br>
We may need to send you critical information about our service and it is important
that we have an accurate email address.

@component('mail::button', ['url' => 'http://localhost:8000/api/verify_email/'.$user->id])
Confirm Email Address
@endcomponent

— The team
@endcomponent
