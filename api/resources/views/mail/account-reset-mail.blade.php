@component('mail::message')
# Reset your password

Someone requested to reset the password on your XMS account. If you did not request this, please ignore this email.

@component('mail::button', ['url' => 'http://localhost:3000/reset_password/'.$verification->link])
Reset your password
@endcomponent

— The team
@endcomponent
